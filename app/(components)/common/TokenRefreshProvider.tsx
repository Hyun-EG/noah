"use client";

import { useTokenRefresh } from "@/hooks/useTokenRefresh";

const TokenRefreshProvider = () => {
  useTokenRefresh();
  return null;
};

export default TokenRefreshProvider;
