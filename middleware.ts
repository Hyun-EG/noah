import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "./lib/auth";

export function middleware(request: NextRequest) {
  /* const pathname = request.nextUrl.pathname;
  // CSRF 보호가 필요한 경로들
  const protectedPaths = ["/api/post/admin/create", "/api/post/admin/edit"];
  // 현재 경로가 보호된 경로인지 확인
  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    // GET 요청은 CSRF 검증 제외
    if (request.method === "GET") {
      return NextResponse.next();
    }
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      return NextResponse.json(
        { error: "로그인이 필요합니다." },
        { status: 401 }
      );
    }
    // 토큰 유효성 검증
    const payload = verifyAccessToken(accessToken);
    if (!payload) {
      return NextResponse.json(
        {
          error: "토큰이 만료되었습니다. 새로고침해주세요.",
          needRefresh: true,
        },
        { status: 401 }
      );
    }
    // CSRF 토큰 검증
    const csrfToken = request.headers.get("x-csrf-token");
    const cookieToken = request.cookies.get("csrfToken")?.value;
    if (!csrfToken || !cookieToken || csrfToken !== cookieToken) {
      return NextResponse.json(
        { error: "CSRF 토큰이 유효하지 않습니다" },
        { status: 403 }
      );
    }
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/api/post/admin/:path*"], */
}
