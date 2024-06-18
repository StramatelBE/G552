import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (token) => set({ token }),
      setUser: (user) => set({ user }),
      clearToken: () => set({ token: null }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'auth-storage', 
      getStorage: () => localStorage, 
    }
  )
);

export default useAuthStore;