import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  const { name, id, password, confirmPassword } = await req.json();

  if (!name || !id || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "모든 필드를 입력해주세요." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      { message: "비밀번호가 일치하지 않습니다." },
      { status: 401 }
    );
  }

  const db = (await connectDB).db("noah");
  const target = await db.collection("user").findOne({ id });

  if (!target) {
    const hashedPW = await bcrypt.hash(password, 10);
    try {
      await db.collection("user").insertOne({
        name,
        id,
        password: hashedPW,
        createdAt: new Date(),
      });
      return NextResponse.json(
        { message: "회원가입에 성공하였습니다." },
        { status: 200 }
      );
    } catch (_) {
      return NextResponse.json(
        { message: "서버에서 에러가 발생하였습니다." },
        { status: 500 }
      );
    }
  }
  if (target) {
    return NextResponse.json(
      { message: "이미 존재하는 유저입니다." },
      { status: 409 }
    );
  }
}
