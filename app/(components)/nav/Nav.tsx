import React from "react";
import ThemeSwitcher from "../theme/ThemeSwitcher";
import Link from "next/link";
import { navItemsList } from "./navItemsList";
import Logo from "./_components/Logo";
import { navLink } from "./variants";
import SubNav from "./_components/SubNav";

const Nav = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-12 px-3 md:px-4 flex justify-between items-center border-b text-black dark:text-white">
      <div className="flex items-center gap-2 md:gap-4">
        <div className="flex justify-center items-center">
          <Logo />
        </div>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-3 lg:gap-4">
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
      <nav>
        <ul className=" flex items-center gap-3">
          <li>
            <Link
              className={`${navLink({
                size: "md",
                tone: "default",
                weight: "normal",
              })} hidden md:block`}
              aria-label="로그인으로 이동하기"
              href="/signin"
            >
              로그인
            </Link>
          </li>
          <li className="flex items-center">
            <ThemeSwitcher />
          </li>
          <li className="md:hidden">
            <SubNav />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Nav;
