"use client";

import { useForm } from "react-hook-form";
import Editor from "./Editor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/util/cookie";

const CreateBox = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [content, setContent] = useState("");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const router = useRouter();

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("파일 크기는 5MB 이하여야 합니다.");
        return;
      }
      setThumbnailFile(file);
    }
  };

  const uploadImageToVercel = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("/api/post/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "이미지 업로드에 실패했습니다.");
    }

    const { url } = await response.json();
    return url;
  };

  const onSubmit = async () => {
    const formData = getValues();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !thumbnailFile ||
      !content
    ) {
      alert("모든 필드값은 필수입니다.");
      return;
    }

    setIsUploading(true);

    try {
      const thumbnailUrl = await uploadImageToVercel(thumbnailFile);

      const csrfToken = getCookie("csrfToken");

      const res = await fetch("/api/post/admin/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-csrf-token": csrfToken || "",
        },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category: formData.category,
          thumbnail: thumbnailUrl,
          content,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert(result.message);
      router.push("/post");
    } catch (error) {
      console.error("업로드 에러", error);
      alert(
        error instanceof Error ? error.message : "이미지 업로드에 실패했습니다."
      );
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <section className="flex flex-col gap-4">
      <input
        {...register("title")}
        type="text"
        className="w-full h-10 p-2 border border-gray-300 rounded-md"
        placeholder="제목"
      />
      <input
        {...register("description")}
        type="text"
        className="w-full h-10 p-2 border border-gray-300 rounded-md"
        placeholder="설명"
      />
      <input
        {...register("category")}
        type="text"
        className="w-full h-10 p-2 border border-gray-300 rounded-md"
        placeholder="카테고리"
      />
      <div className="flex flex-col gap-2 h-16">
        <input
          type="file"
          accept="image/*"
          onChange={handleThumbnailChange}
          className="w-full h-10"
          placeholder="대표 이미지"
        />
        {thumbnailFile && (
          <p className="text-sm text-gray-600">
            선택된 파일: {thumbnailFile.name} (
            {(thumbnailFile.size / 1024 / 1024).toFixed(2)}MB)
          </p>
        )}
      </div>
      <Editor
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
      />
      <button
        onClick={handleSubmit(onSubmit)}
        disabled={isUploading}
        className="w-full h-10 mobile:mt-10 laptop:mt-0 desktop:mt-0 bg-primary dark:bg-dark text-white rounded-md disabled:opacity-50"
      >
        {isUploading ? "업로드 중..." : "작성하기"}
      </button>
    </section>
  );
};

export default CreateBox;
