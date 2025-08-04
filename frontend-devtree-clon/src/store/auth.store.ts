import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface User {
  id: string;
  email: string;
  name: string;
  slug: string;
  isActive: boolean;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        isLoading: true,
        isAuthenticated: false,
        setUser: (user) =>
          set({
            user,
            isAuthenticated: !!user,
            isLoading: false,
          }),
        setLoading: (loading) => set({ isLoading: loading }),
        logout: () =>
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false,
          }),
      }),
      {
        name: "auth-storage", // Nombre de la clave en localStorage
        // getStorage: () => localStorage, // Cambiar a sessionStorage si es necesario
      }
    ),
    { name: "AuthStore", enabled: process.env.NODE_ENV === "development" } // Solo habilitar en desarrollo
  )
);
