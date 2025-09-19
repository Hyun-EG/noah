import { put } from "@vercel/blob";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json(
        { error: "파일이 선택되지 않았습니다." },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return Response.json(
        { error: "이미지 파일만 업로드 가능합니다." },
        { status: 400 }
      );
    }

    if (file.size > 5 * 1024 * 1024) {
      return Response.json(
        { error: "파일 크기는 5MB 이하여야 합니다." },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const fileName = `thumbnail-${timestamp}-${file.name}`;

    const blob = await put(fileName, file, {
      access: "public",
    });

    return Response.json({ url: blob.url });
  } catch (error) {
    console.error("Vercel Blob 업로드 에러", error);
    return Response.json(
      { error: "업로드에 실패 하였습니다." },
      { status: 500 }
    );
  }
}
