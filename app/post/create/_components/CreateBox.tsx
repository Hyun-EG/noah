"use client";

import { useForm } from "react-hook-form";
import Editor from "./Editor";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "@/util/cookie";

const CreateBox = () => {
  const { register, handleSubmit, getValues } = useForm();
  const [content, setContent] = useState("");

  const router = useRouter();

  const onSubmit = async () => {
    const formData = getValues();

    if (
      !formData.title ||
      !formData.description ||
      !formData.category ||
      !content
    ) {
      alert("모든 필드값은 필수입니다.");
      return;
    }
    try {
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
      console.error("서버 에러", error);
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
      <Editor
        value={content}
        onChange={(value) => {
          setContent(value);
        }}
      />
      <button
        onClick={handleSubmit(onSubmit)}
        className="w-full h-10 mobile:mt-10 laptop:mt-0 desktop:mt-0 bg-primary dark:bg-dark text-white rounded-md"
      >
        작성하기
      </button>
    </section>
  );
};

export default CreateBox;
