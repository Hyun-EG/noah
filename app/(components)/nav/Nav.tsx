"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/icons/icon-logo-192x192.png";
import { useRouter } from "next/navigation";
import ThemeSwitcher from "./ThemeSwitcher";

const Nav = () => {
  const navItems = [
    {
      name: "홈",
      link: "/",
    },
    { name: "게시물", link: "/board" },
  ];
  const router = useRouter();
  return (
    <header className="w-full h-12 px-2 flex justify-between items-center border-b">
      <div className="w-[70%] h-full flex">
        <div className="w-[5%] h-full flex justify-center items-center">
          <Image
            title="Noah 로고 [홈으로 이동하기]"
            className="rounded-full cursor-pointer"
            src={logo}
            width={36}
            height={36}
            alt="Noah 홈페이지 로고"
            priority
          />
        </div>
        <nav>
          <ul className="w-full h-full ml-6 flex justify-center items-center gap-4">
            {navItems.map((item, idx) => (
              <li
                className="cursor-pointer"
                onClick={() => {
                  router.push(item.link);
                }}
                key={idx}
              >
                {item.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav className="w-[30%] ">
        <ul className="h-full flex justify-end items-center gap-4">
          <li>로그인</li>
          <ThemeSwitcher />
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
