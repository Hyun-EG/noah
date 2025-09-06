import React from "react";
import SignInForm from "./_components/SignInForm";

const SignInPage = () => {
  return (
    <main className="w-full h-[calc(100vh-3rem)] pb-20 flex flex-col justify-center items-center gap-10">
      <h1 className="text-center text-2xl">관리자 로그인</h1>
      <SignInForm />
    </main>
  );
};

export default SignInPage;
