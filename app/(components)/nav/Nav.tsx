"use client";

import Image from "next/image";
import React from "react";
import logo from "@/public/icons/icon-logo-192x192.png";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import Link from "next/link";
import { navItemsList } from "./navItemsList";

const Nav = () => {
  return (
    <header className="w-full h-12 px-2 flex justify-between items-center border-b dark:text-white">
      <div className="w-[70%] h-full flex">
        <div className="w-[5%] h-full flex justify-center items-center">
          <Link href="/" aria-label="홈으로 이동하기" title="Noah 로고">
            <Image
              className="rounded-full cursor-pointer"
              src={logo}
              width={36}
              height={36}
              alt="Noah 홈페이지 로고"
              priority
            />
          </Link>
        </div>

        <nav>
          <ul className="w-full h-full ml-6 flex justify-center items-center gap-4">
            {navItemsList.map((item, idx) => (
              <li key={idx}>
                <a href={item.link}>{item.name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav className="w-[30%] ">
        <ul className="h-full flex justify-end items-center gap-4">
          <li>
            <Link aria-label="로그인으로 이동하기" href="/signin">
              로그인
            </Link>
          </li>
          <ThemeSwitcher />
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
