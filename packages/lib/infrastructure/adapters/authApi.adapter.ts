import { apiClient } from './apiClient.adapter'
import { User, UserCredentials, UserRegistration } from '../../domain/entities/User';

interface AuthResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export const authApi = {
    login: async (credentials: UserCredentials): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: UserRegistration): Promise<AuthResponse> => {
        const response = await apiClient.post<AuthResponse>('/auth/register', userData);
        return response.data;
    },

    logout: async (): Promise<void> => {
        await apiClient.post('/auth/logout');
    },

    getCurrentUser: async (): Promise<User> => {
        const response = await apiClient.get<User>('/auth/me');
        return response.data;
    },

    refreshToken: async (refreshToken: string): Promise<{ accessToken: string; refreshToken: string }> => {
        const response = await apiClient.post('/auth/refresh', { refreshToken });
        return response.data;
    },
};
