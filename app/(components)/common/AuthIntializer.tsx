"use client";

import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useRef } from "react";

export const AuthInitializer = () => {
  const { checkAuthStatus, isInitialized } = useAuthStore();
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && !isInitialized) {
      hasInitialized.current = true;
      checkAuthStatus();
    }
  }, [checkAuthStatus, isInitialized]);

  return null;
};
