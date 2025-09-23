"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export const AuthInitializer = () => {
  const { checkAuthStatus } = useAuthStore();

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  return null;
};
