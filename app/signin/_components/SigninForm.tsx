"use client";

import Input from "@/app/(components)/common/Input";
import LoadingOverlay from "@/app/(components)/common/LoadingOverlay";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const SigninForm = () => {
  const [user, setUser] = useState({
    id: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: user.id,
          password: user.password,
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        alert(result.message);
        return;
      }
      alert("로그인에 성공하였습니다.");
      router.push("/");
    } catch (_) {
      alert("서버 에러 발생");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <LoadingOverlay />}
      <form className="w-full flex flex-col gap-4">
        <Input
          value={user.id}
          onChange={(e) => {
            setUser({ ...user, id: e.target.value });
          }}
          name="id"
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <Input
          value={user.password}
          onChange={(e) => {
            setUser({ ...user, password: e.target.value });
          }}
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <button
          onClick={handleSignin}
          className="h-16 bg-sky-500 rounded-lg text-white font-bold"
          type="submit"
        >
          로그인
        </button>
      </form>
    </>
  );
};

export default SigninForm;
