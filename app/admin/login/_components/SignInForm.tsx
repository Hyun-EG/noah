"use client";

import Toast from "@/app/(components)/common/Toast";
import { loginSchema } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full px-10 flex flex-col justify-center items-center gap-4"
      >
        <input
          {...register("username")}
          className="w-full h-12 pl-2 border rounded-lg outline-none"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <input
          {...register("password")}
          className="w-full h-12 pl-2 border rounded-lg outline-none"
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
      <Toast>Test</Toast>
    </>
  );
};

export default SignInForm;
