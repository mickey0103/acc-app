import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, UserRole } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      login: async (email: string, password: string) => {
        set({ isLoading: true });
        // TODO: Replace with actual API call
        // Mock login
        const mockUser: User = {
          id: '1',
          email,
          firstName: 'John',
          lastName: 'Doe',
          role: 'guest',
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
      signUp: async (email: string, password: string, firstName: string, lastName: string, role: UserRole) => {
        set({ isLoading: true });
        // TODO: Replace with actual API call
        const mockUser: User = {
          id: Date.now().toString(),
          email,
          firstName,
          lastName,
          role,
          createdAt: new Date().toISOString(),
        };
        set({ user: mockUser, isAuthenticated: true, isLoading: false });
      },
      logout: () => {
        set({ user: null, isAuthenticated: false });
      },
      updateUser: (updates: Partial<User>) => {
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        }));
      },
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

