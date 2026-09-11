  'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { apiClient } from '@/lib/api-client';
import { API_URL } from '@/lib/constants';

export interface UserModulePermission {
  id: string;
  userId: string;
  moduleId: string;
  canView: boolean;
  canCreate: boolean;
  canEdit: boolean;
  canDelete: boolean;
  module: {
    code: string;
  };
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPERADMIN' | 'ADMIN' | 'EDITOR';
  avatar?: string;
  bio?: string;
  canCreateUsers: boolean;
  modules?: UserModulePermission[];
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setTokens: (access: string, refresh: string) => void;
  refreshProfile: () => Promise<void>;
  refreshAccessToken: () => Promise<string | null>;
}

let activeRefreshPromise: Promise<string | null> | null = null;

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const { data } = await apiClient.post('/auth/login', { email, password });
          const { user, tokens } = data.data;
          
          localStorage.setItem('accessToken', tokens.accessToken);
          localStorage.setItem('refreshToken', tokens.refreshToken);
          
          set({
            user,
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            isAuthenticated: true,
            isLoading: false,
          });
        } catch (error: any) {
          set({ isLoading: false });
          throw new Error(error.response?.data?.message || error.message || 'Login failed');
        }
      },

      logout: () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          isAuthenticated: false,
        });
      },

      setTokens: (access: string, refresh: string) => {
        localStorage.setItem('accessToken', access);
        localStorage.setItem('refreshToken', refresh);
        set({ accessToken: access, refreshToken: refresh });
      },

      refreshProfile: async () => {
        try {
          const response = await apiClient.get('/auth/profile');
          // Handle both response shapes from apiClient
          const userData = (response as any)?.data?.data ?? (response as any)?.data;
          if (userData?.id) {
            set({ user: userData });
          }
        } catch (error: any) {
          // Profile fetch failure should NEVER cause a logout.
          // The Axios interceptor handles token refresh. If it fails with
          // a 401/403, the interceptor itself will handle the logout.
          console.warn('Profile refresh failed (will retry):', error?.response?.status || error?.message);
        }
      },

      refreshAccessToken: async () => {
        if (activeRefreshPromise) {
          return activeRefreshPromise;
        }

        const storedRefreshToken =
          (typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null) ||
          get().refreshToken;

        if (!storedRefreshToken) {
          return null;
        }

        activeRefreshPromise = (async () => {
          try {
            const { data } = await axios.post(`${API_URL}/auth/refresh-token`, {
              refreshToken: storedRefreshToken,
            });

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = data.data || {};

            if (newAccessToken) {
              localStorage.setItem('accessToken', newAccessToken);
              if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
              }
              set({
                accessToken: newAccessToken,
                refreshToken: newRefreshToken || storedRefreshToken,
                isAuthenticated: true,
              });
              return newAccessToken;
            }
            return null;
          } catch (error: any) {
            // If refresh token is explicitly rejected (401/403), logout
            if (error.response?.status === 401 || error.response?.status === 403) {
              get().logout();
              if (typeof window !== 'undefined') {
                window.location.href = '/login';
              }
            }
            // On network errors or server issues, do not log out
            return null;
          } finally {
            activeRefreshPromise = null;
          }
        })();

        return activeRefreshPromise;
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);