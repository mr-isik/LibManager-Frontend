import { create } from 'zustand';
import { User } from '../types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  token: null,
  login: (user: User, token: string) =>
    set({
      user,
      token,
      isAuthenticated: true,
    }),
  logout: () =>
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    }),
}));

interface UIState {
  sidebarOpened: boolean;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  sidebarOpened: true,
  toggleSidebar: () =>
    set((state) => ({
      sidebarOpened: !state.sidebarOpened,
    })),
})); 