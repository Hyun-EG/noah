"use client";

import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const { register, handleSubmit, getValues } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async () => {
    const formData = getValues();
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: formData.userId,
          password: formData.password,
        }),
      });

      const result = await res.json();
      console.log(formData.userId);
      console.log(formData.password);

      if (!res.ok) {
        alert(result.message);
        return;
      }

      alert(result.message);
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full laptop:w-[80%] desktop:w-[70%] px-10 flex flex-col justify-center items-center gap-4"
      >
        <input
          {...register("userId")}
          className="w-full h-12 pl-2 border outline-primary rounded-lg"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <input
          {...register("password")}
          className="w-full h-12 pl-2 border outline-primary rounded-lg"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button
          className="w-full h-12 border rounded-lg bg-primary text-white dark:bg-dark"
          type="submit"
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default SignInForm;
