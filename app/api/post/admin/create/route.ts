import { verifyAccessToken } from "@/lib/auth";
import { connectDB } from "@/lib/connectDB";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { title, description, category, thumbnail, content } = await req.json();

  const cookie = await cookies();
  const token = cookie.get("accessToken");
  const decodedToken = verifyAccessToken(token!.value);
  const userId = decodedToken?.userId;

  if (!title || !description || !category || !thumbnail || !content) {
    return NextResponse.json(
      { message: "모든 필드값을 채워주세요." },
      { status: 400 }
    );
  }

  try {
    const client = await connectDB();
    const db = client.db("noah");
    const result = await db.collection("post").insertOne({
      title,
      description,
      category,
      thumbnail,
      content,
      authorId: userId,
      createdAt: new Date().toISOString().split("T")[0],
    });

    if (!result.acknowledged) {
      return NextResponse.json(
        { message: "게시물 등록에 실패하였습니다." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "새로운 게시물을 등록하였습니다." },
      { status: 200 }
    );
  } catch (error) {
    console.error("전체 API 에러:", error);

    return NextResponse.json({ message: "서버 에러입니다." }, { status: 500 });
  }
}
