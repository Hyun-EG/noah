import { put } from "@vercel/blob";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return Response.json({ error: "No file uploaded" }, { status: 400 });
    }

    const blob = await put(file.name, file, {
      access: "public",
    });

    return Response.json({ url: blob.url });
  } catch (error) {
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}
