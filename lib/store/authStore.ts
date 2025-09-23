import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  userId: string;
  userEmail: string;
  userName: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,

      login: (userData) =>
        set({
          isLoggedIn: true,
          user: userData,
        }),

      logout: () => {
        fetch("/api/logout", { method: "POST" });
        set({ isLoggedIn: false, user: null });
      },

      checkAuthStatus: async () => {
        try {
          const response = await fetch("/api/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            if (data.user) {
              set({ isLoggedIn: true, user: data.user });
              return true;
            }
          }

          set({ isLoggedIn: false, user: null });
          return false;
        } catch {
          set({ isLoggedIn: false, user: null });
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
    }
  )
);
