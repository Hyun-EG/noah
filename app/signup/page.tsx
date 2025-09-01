import React from "react";
import SignupForm from "./_components/SignupForm";

const SignupPage = () => {
  return (
    <section className="h-screen px-2 flex flex-col justify-center itmes-center gap-2">
      <h1 className="text-xl text-center font-bold">회원가입</h1>
      <SignupForm />
    </section>
  );
};

export default SignupPage;
