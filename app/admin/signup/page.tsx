import React from "react";
import SignupForm from "./_components/SignupForm";
import Link from "next/link";

const SignupPage = () => {
  return (
    <main className="w-full h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-2xl">회원 가입</h1>
      <SignupForm />
      <p className="text-sm">
        이미 계정이 있으신가요?{" "}
        <span className="text-tertiary">
          <Link href="/admin/login">로그인 하러가기</Link>
        </span>
      </p>
    </main>
  );
};

export default SignupPage;
