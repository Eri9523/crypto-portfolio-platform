import { create } from 'zustand';
import { User } from '../../domain/entities/User';
import { authApi } from '../../infrastructure/adapters/authApi.adapter';
import { tokenStorage } from '../../infrastructure/storage/tokenStorage';

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (name: string, email: string, password: string, phone?: string) => Promise<void>;
    logout: () => Promise<void>;
    checkAuth: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: tokenStorage.hasTokens(), // Start as loading if we have tokens
    error: null,

    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authApi.login({ email, password });
            tokenStorage.setTokens(response.accessToken, response.refreshToken);
            set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
            set({
                error: 'Usuario o contraseña incorrectos',
                isLoading: false
            });
            throw error;
        }
    },

    register: async (name, email, password, phone) => {
        set({ isLoading: true, error: null });
        try {
            const response = await authApi.register({ name, email, password, phone });
            tokenStorage.setTokens(response.accessToken, response.refreshToken);
            set({ user: response.user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || 'Error al registrarse',
                isLoading: false
            });
            throw error;
        }
    },

    logout: async () => {
        try {
            await authApi.logout();
        } catch (error) {
            console.error('Error during logout:', error);
        } finally {
            tokenStorage.clearTokens();
            set({ user: null, isAuthenticated: false, error: null });
        }
    },

    checkAuth: async () => {
        if (!tokenStorage.hasTokens()) {
            set((state) => {
                return {
                    isAuthenticated: false,
                    user: null,
                    isLoading: false,
                    error: state.error
                };
            });
            return;
        }

        set({ isLoading: true });
        try {
            const user = await authApi.getCurrentUser();
            set({ user, isAuthenticated: true, isLoading: false });
        } catch (error) {
            tokenStorage.clearTokens();
            set({ user: null, isAuthenticated: false, isLoading: false });
        }
    },

    clearError: () => {
        set({ error: null });
    },
}));
