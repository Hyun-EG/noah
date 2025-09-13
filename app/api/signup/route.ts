import { hashPassword } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { userName, userEmail, userId, password, confirmPassword } =
    await req.json();

  if (!userName || !userId || !userEmail || !password || !confirmPassword) {
    return NextResponse.json(
      { message: "누락된 필드가 있습니다." },
      { status: 400 }
    );
  }

  if (password !== confirmPassword) {
    return NextResponse.json(
      {
        message: "비밀번호가 일치하지 않습니다",
      },
      { status: 422 }
    );
  }

  const client = await connectDB();
  const db = client.db("noah");
  const target = await db.collection("user").findOne({
    userId,
    userEmail,
  });

  if (target) {
    return NextResponse.json(
      { message: "이미 가입된 계정입니다." },
      { status: 409 }
    );
  }

  try {
    const hashedPW = await hashPassword(password);
    await db.collection("user").insertOne({
      userName,
      userId,
      userEmail,
      password: hashedPW,
      createdAt: new Date().toISOString().split("T")[0],
    });

    return NextResponse.json(
      { message: "회원가입을 완료하였습니다." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
