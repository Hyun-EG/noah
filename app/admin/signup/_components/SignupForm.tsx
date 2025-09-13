"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { register, handleSubmit, getValues } = useForm();
  const router = useRouter();

  const onSignupSubmit = async () => {
    const formData = getValues();

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: formData.name,
          userEmail: formData.email,
          userId: formData.id,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        alert(result.message || "오류가 발생했습니다");
        return;
      }

      alert(result.message);
      router.push("/admin/login");
    } catch (_) {
      alert("서버 에러");
    }
  };
  return (
    <form
      className="w-full laptop:w-[80%] desktop:w-[70%] px-10 pb-20 flex flex-col justify-center items-center gap-2"
      onSubmit={handleSubmit(onSignupSubmit)}
    >
      <input
        className="w-full h-12 pl-2 border outline-primary dark:border-light rounded-lg"
        {...register("name", { required: "성함을 입력해주세요." })}
        type="text"
        placeholder="성함을 입력해주세요."
      />
      <input
        className="w-full h-12 pl-2 border outline-primary dark:border-light rounded-lg"
        {...register("email", { required: "이메일을 입력해주세요." })}
        type="email"
        placeholder="이메일을 입력해주세요."
      />
      <input
        className="w-full h-12 pl-2 border outline-primary dark:border-light rounded-lg"
        {...register("id", { required: "아이디를 입력해주세요." })}
        type="text"
        placeholder="아이디를 입력해주세요."
      />
      <input
        className="w-full h-12 pl-2 border outline-primary dark:border-light rounded-lg"
        {...register("password", { required: "비밀번호를 입력해주세요." })}
        type="password"
        placeholder="비밀번호를 입력해주세요."
      />
      <input
        className="w-full h-12 pl-2 border outline-primary dark:border-light rounded-lg"
        {...register("confirmPassword", {
          required: "비밀번호를 한번 더 입력해주세요",
        })}
        type="password"
        placeholder="비밀번호를 한번 더 입력해주세요."
      />
      <button
        className="w-full h-12 bg-primary border dark:bg-dark text-light rounded-lg"
        type="submit"
      >
        회원가입 하기
      </button>
    </form>
  );
};

export default SignupForm;
