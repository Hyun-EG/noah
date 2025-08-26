import React from "react";
import Input from "../(components)/common/Input";

const LoginPage = () => {
  return (
    <section className="w-full px-4 flex flex-col items-center gap-4 justify-center h-screen text-black">
      <h1 className="text-xl text-center font-bold dark:text-white">
        관리자 로그인
      </h1>
      <form className="w-full flex flex-col gap-4">
        <Input name="id" type="text" placeholder="아이디를 입력해주세요." />
        <Input
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button
          className="h-16 bg-sky-500 rounded-lg text-white font-bold"
          type="submit"
        >
          로그인
        </button>
      </form>
    </section>
  );
};

export default LoginPage;
