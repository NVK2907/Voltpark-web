import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuthenticated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: true, // mock default to true for preview
  isLoading: false,
  setAuthenticated: (value) => set({ isAuthenticated: value }),
}));
