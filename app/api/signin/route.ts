import {
  generateAccessToken,
  generateCSRFToken,
  generateRefreshToken,
  saveRefreshToken,
  verifyPassword,
} from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userId, password } = await req.json();

  if (!userId || !password) {
    return NextResponse.json(
      { message: "로그인 필드가 누락되어 있습니다." },
      { status: 400 }
    );
  }

  try {
    const client = await connectDB();
    const db = client.db("noah");
    const target = await db.collection("user").findOne({ userId });

    if (!target) {
      return NextResponse.json(
        { message: "존재하지 않는 계정입니다." },
        { status: 422 }
      );
    }

    const isValidPW = await verifyPassword(password, target.password);

    if (!isValidPW) {
      return NextResponse.json(
        { message: "비밀번호가 일치하지 않습니다." },
        { status: 422 }
      );
    }

    const accessToken = generateAccessToken({
      userId: target.userId,
      email: target.userEmail,
    });
    const refreshToken = generateRefreshToken({
      userId: target.userId,
      email: target.userEmail,
    });
    const csrfToken = generateCSRFToken();

    await saveRefreshToken(target.userId, refreshToken);

    const response = NextResponse.json(
      {
        message: "로그인에 성공하였습니다.",
        user: {
          userId: target.userId,
          userEmail: target.userEmail,
          userName: target.userName,
        },
      },
      { status: 200 }
    );

    response.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
    });

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 24 * 60 * 60,
    });

    response.cookies.set("csrfToken", csrfToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60,
    });

    return response;
  } catch (error) {
    console.error("로그인 에러:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
