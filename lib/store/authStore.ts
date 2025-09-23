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
  isInitialized: boolean;
  login: (userData: User) => void;
  logout: () => void;
  checkAuthStatus: () => Promise<boolean>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      user: null,
      isInitialized: false,

      login: (userData) =>
        set({
          isLoggedIn: true,
          user: userData,
          isInitialized: true,
        }),

      logout: () => {
        fetch("/api/logout", { method: "POST" });
        set({ isLoggedIn: false, user: null, isInitialized: true });
      },

      checkAuthStatus: async () => {
        if (get().isInitialized) return get().isLoggedIn;

        try {
          const response = await fetch("/api/refresh", {
            method: "POST",
            credentials: "include",
          });

          if (response.ok) {
            const data = await response.json();
            if (data.user) {
              set({
                isLoggedIn: true,
                user: {
                  userId: data.user.userId,
                  userEmail: data.user.userEmail || data.user.email,
                  userName: data.user.userName || "관리자",
                },
                isInitialized: true,
              });
              return true;
            }
          }

          set({ isLoggedIn: false, user: null, isInitialized: true });
          return false;
        } catch {
          set({ isLoggedIn: false, user: null, isInitialized: true });
          return false;
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
        isInitialized: state.isInitialized,
      }),
    }
  )
);
