import axios from 'axios';
import { tokenStorage } from '../storage/tokenStorage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = tokenStorage.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If error is 401 and we haven't retried yet
        if (error.response?.status === 401 && !originalRequest._retry) {
            // Skip for login requests to prevent infinite loops or unwanted redirects
            if (originalRequest.url?.includes('/auth/login')) {
                return Promise.reject(error);
            }

            originalRequest._retry = true;

            try {
                const refreshToken = tokenStorage.getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                // Try to refresh the token
                const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                const { accessToken, refreshToken: newRefreshToken } = response.data;
                tokenStorage.setTokens(accessToken, newRefreshToken);

                // Retry the original request with new token
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return apiClient(originalRequest);
            } catch (refreshError) {
                // If refresh fails, clear tokens and redirect to login
                tokenStorage.clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
