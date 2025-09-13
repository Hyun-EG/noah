export const refreshTokens = async (): Promise<boolean> => {
  try {
    const res = await fetch("/api/refresh", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      console.log("토큰 갱신 성공");
      return true;
    } else {
      console.log("리프레시 토큰 만료, 로그인 필요");
      window.location.href = "/admin/login";
      return false;
    }
  } catch (error) {
    console.error("토큰 갱신 실패: ", error);
    return false;
  }
};

export const getCSRFToken = (): string => {
  const csrfToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrfToken="))
    ?.split("=")[1];

  return csrfToken || "";
};

export const apiRequest = async (url: string, options: RequestInit = {}) => {
  let response = await fetch(url, {
    ...options,
    credentials: "include",
  });

  // 401 에러 시 토큰 갱신 시도
  if (response.status === 401) {
    const refreshSuccess = await refreshTokens();

    if (refreshSuccess) {
      // 토큰 갱신 성공 시 원래 요청 재시도
      response = await fetch(url, {
        ...options,
        credentials: "include",
      });
    }
  }

  return response;
};
