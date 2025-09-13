import {
  generateAccessToken,
  generateCSRFToken,
  generateRefreshToken,
  saveRefreshToken,
  verifyAndGetUserFromRefreshToken,
  deleteRefreshToken,
} from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (!refreshToken) {
      return NextResponse.json(
        { message: "리프레시 토큰이 없습니다." },
        { status: 401 }
      );
    }

    // 리프레시 토큰 검증 및 사용자 정보 가져오기
    const user = await verifyAndGetUserFromRefreshToken(refreshToken);

    if (!user) {
      return NextResponse.json(
        { message: "유효하지 않은 리프레시 토큰입니다." },
        { status: 401 }
      );
    }

    // 기존 리프레시 토큰 삭제
    await deleteRefreshToken(user.userId);

    // 새로운 토큰들 생성
    const newAccessToken = generateAccessToken({
      userId: user.userId,
      email: user.email,
    });
    const newRefreshToken = generateRefreshToken({
      userId: user.userId,
      email: user.email,
    });
    const newCSRFToken = generateCSRFToken();

    // 새로운 리프레시 토큰 DB에 저장
    await saveRefreshToken(user.userId, newRefreshToken);

    // 응답 생성
    const response = NextResponse.json(
      {
        message: "토큰이 갱신되었습니다.",
        user: {
          userId: user.userId,
          email: user.email,
        },
      },
      { status: 200 }
    );

    // 새로운 쿠키 설정
    response.cookies.set("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15분
    });

    response.cookies.set("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60, // 24시간
    });

    response.cookies.set("csrfToken", newCSRFToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60, // 15분
    });

    return response;
  } catch (error) {
    console.error("토큰 갱신 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
