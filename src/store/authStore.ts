import { create } from 'zustand';
import { User } from '../types';
import { auth } from '../services/apiService';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
  checkAuth: () => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean }>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ loading: true, error: null });

      const response = await auth.login(email, password);

      if (response.token) {
        localStorage.setItem('auth_token', response.token);
      }

      set({ user: response.user });
    } catch (error) {
      set({ error: (error as Error).message });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try {
      await auth.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('auth_token');
      set({ user: null, error: null });
    }
  },

  clearError: () => set({ error: null }),

  checkAuth: async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      set({ user: null });
      return;
    }

    try {
      set({ loading: true });
      const user = await auth.getCurrentUser();
      set({ user });
    } catch (error) {
      localStorage.removeItem('auth_token');
      set({ user: null });
    } finally {
      set({ loading: false });
    }
  },

  changePassword: async (currentPassword: string, newPassword: string) => {
    try {
      set({ loading: true, error: null });
      await auth.changePassword(currentPassword, newPassword);
      return { success: true };
    } catch (error) {
      set({ error: (error as Error).message });
      return { success: false };
    } finally {
      set({ loading: false });
    }
  },
}));