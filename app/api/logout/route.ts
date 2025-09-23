import { deleteRefreshToken } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get("refreshToken")?.value;

    if (refreshToken) {
      await deleteRefreshToken(refreshToken);
    }

    const res = NextResponse.json({ message: "로그아웃 되었습니다." });

    res.cookies.set("accessToken", "", { maxAge: 0 });
    res.cookies.set("refreshToken", "", { maxAge: 0 });
    res.cookies.set("csrfToken", "", { maxAge: 0 });
    return res;
  } catch (error) {
    console.error("로그아웃 에러:", error);
    return NextResponse.json(
      { message: " 로그아웃 중 오류가 발생하였습니다. " },
      { status: 500 }
    );
  }
}
