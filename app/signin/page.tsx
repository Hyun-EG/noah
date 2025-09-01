import React from "react";
import SigninForm from "./_components/SigninForm";

const SigninPage = () => {
  return (
    <section className="w-full px-4 flex flex-col items-center gap-4 justify-center h-screen text-black">
      <h1 className="text-xl text-center font-bold dark:text-white">
        관리자 로그인
      </h1>
      <SigninForm />
    </section>
  );
};

export default SigninPage;
