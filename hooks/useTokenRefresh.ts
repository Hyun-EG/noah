import { useEffect, useRef } from "react";
import { refreshTokens } from "../lib/tokenUtils";

export const useTokenRefresh = () => {
  const refreshInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    refreshInterval.current = setInterval(async () => {
      await refreshTokens();
    }, 14 * 60 * 1000);

    return () => {
      if (refreshInterval.current) {
        clearInterval(refreshInterval.current);
        refreshInterval.current = null;
      }
    };
  }, []);

  const manualRefresh = async () => {
    return await refreshTokens();
  };

  return { manualRefresh };
};
