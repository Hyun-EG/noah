"use client";

import Input from "@/app/(components)/common/Input";
import LoadingOverlay from "@/app/(components)/common/LoadingOverlay";
import React, { useState } from "react";

const SignupForm = () => {
  const [user, setUser] = useState({
    name: "",
    id: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.name,
          id: user.id,
          password: user.password,
          confirmPassword: user.confirmPassword,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.meesage);
        return;
      }
      alert(result.message);
    } catch (err) {
      console.error(err, "서버 에러 발생");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form>
        <Input
          value={user.name}
          onChange={(e) => {
            setUser({ ...user, name: e.target.value });
          }}
          placeholder="성함을 입력해주세요."
          name="name"
          type="text"
        />
        <Input
          value={user.id}
          onChange={(e) => {
            setUser({ ...user, id: e.target.value });
          }}
          placeholder="아이디를 입력해주세요."
          name="id"
          type="text"
        />
        <Input
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          placeholder="비밀번호를 입력해주세요."
          name="password"
          type="password"
        />
        <Input
          value={user.confirmPassword}
          onChange={(e) => {
            setUser({ ...user, confirmPassword: e.target.value });
          }}
          placeholder="비밀번호를 다시 한 번 입력해주세요."
          name="confirmPassword"
          type="password"
        />
        <button
          className="w-full h-16 bg-sky-500 text-white font-bold"
          type="submit"
          onClick={handleSignup}
        >
          회원가입
        </button>
      </form>
    </>
  );
};

export default SignupForm;
