"use client";

import React from "react";
import { useForm } from "react-hook-form";

const SignupForm = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = () => {
    console.log("d");
  };
  return (
    <form
      className="w-full laptop:w-[80%] desktop:w-[70%] px-10 pb-20 flex flex-col justify-center items-center gap-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="w-full h-12 pl-2 border outline-primary dark:border-light rounded-lg"
        {...register("name", { required: "성함을 입력해주세요." })}
        type="text"
        placeholder="성함을 입력해주세요."
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
        type="text"
        placeholder="비밀번호를 입력해주세요."
      />
      <input
        className="w-full h-12 pl-2 border outline-primary dark:border-light rounded-lg"
        {...register("confirmPassword", {
          required: "비밀번호를 한번 더 입력해주세요",
        })}
        type="text"
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
