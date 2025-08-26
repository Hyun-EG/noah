import React from "react";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import Link from "next/link";
import { navItemsList } from "./navItemsList";
import Logo from "./_components/Logo";

const Nav = () => {
  return (
    <header className="w-full h-12 px-2 flex justify-between items-center border-b text-black dark:text-white">
      <div className="w-[70%] h-full flex">
        <div className="w-[5%] h-full flex justify-center items-center">
          <Logo />
        </div>

        <nav>
          <ul className="w-full h-full ml-6 flex justify-center items-center gap-4">
            {navItemsList.map((item) => (
              <li key={item.link}>
                <Link
                  className="transition-slow-color hover:text-sky-500"
                  href={item.link}
                  aria-label={`${item.name}로 이동하기`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <nav className="w-[30%] ">
        <ul className="h-full flex justify-end items-center gap-4">
          <li>
            <Link
              className="transition-slow-color hover:text-sky-500"
              aria-label="로그인으로 이동하기"
              href="/signin"
            >
              로그인
            </Link>
          </li>
          <li className="flex items-center">
            <ThemeSwitcher />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
