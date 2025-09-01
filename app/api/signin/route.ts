import bcrypt from "bcrypt";
import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { id, password } = await req.json();

  if (!id || !password) {
    return NextResponse.json(
      { message: "모든 필드를 입력해주세요." },
      { status: 400 }
    );
  }

  const db = (await connectDB).db("noah");
  const target = await db.collection("user").findOne({ id });

  if (!target) {
    return NextResponse.json(
      { message: "아이디가 존재하지 않습니다." },
      { status: 401 }
    );
  }

  if (target) {
    try {
      const validPW = await bcrypt.compare(password, target.password);
      if (!validPW) {
        return NextResponse.json(
          { message: "비밀번호가 일치하지 않습니다." },
          { status: 401 }
        );
      }
      return NextResponse.json(
        { message: "로그인에 성공하였습니다." },
        { status: 200 }
      );
    } catch (_) {
      return NextResponse.json(
        { message: "서버에서 에러가 발생하였습니다." },
        { status: 500 }
      );
    }
  }
}
