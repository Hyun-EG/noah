"use client";

import React, { useCallback, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { iconBtn } from "../variants";
import { navItemsList } from "../navItemsList";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubNav = () => {
  const [isShowSubNav, setIsShowSubNav] = useState(false);
  const path = usePathname();

  const toggleSubNav = useCallback(() => {
    setIsShowSubNav((prev) => (prev ? false : true));
  }, []);

  return (
    <>
      <button
        onClick={toggleSubNav}
        type="button"
        aria-label="메뉴 열기"
        className={iconBtn({ size: "md", subtle: true })}
      >
        {isShowSubNav ? (
          <FiX className="animate-fadeIn" size={24} />
        ) : (
          <FiMenu className="animate-fadeIn" size={24} />
        )}
      </button>
      {isShowSubNav && (
        <section className="fixed top-12 left-0 z-10 flex flex-col gap-4 w-full min-h-screen py-4 border-t border-sky-500 rounded-t-lg bg-white dark:bg-black dark:border-white animate-fadeIn">
          <nav>
            <ul className="flex flex-col gap-2 text-center">
              <li
                onClick={() => {
                  setIsShowSubNav(false);
                }}
                className="mx-4 py-2 bg-sky-500 text-white rounded-xl dark:bg-white dark:text-black"
              >
                <Link href="/signin" aria-label="로그인으로 이동하기">
                  관리자 로그인
                </Link>
              </li>
            </ul>
          </nav>
          <nav>
            <ul className="flex flex-col gap-2 text-center">
              {navItemsList.map((item) => (
                <li
                  onClick={() => {
                    setIsShowSubNav(false);
                  }}
                  className="mx-4 py-2 border-b border-sky-500 dark:border-[#bebebe]"
                  key={item.link}
                >
                  <Link
                    className={`${path === item.link ? "text-sky-500" : ""}`}
                    href={item.link}
                    aria-label={`${item.name}로 이동하기`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </section>
      )}
    </>
  );
};

export default SubNav;
