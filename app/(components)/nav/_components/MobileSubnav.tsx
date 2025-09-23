"use client";

import React, { useCallback, useMemo } from "react";
import { navItemList } from "./navItemList";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";

const MobileSubnav = React.memo(
  ({ setSubnav }: { setSubnav: (state: boolean) => void }) => {
    const path = usePathname();
    const { isLoggedIn, logout } = useAuthStore();

    const toggleNav = useCallback(() => {
      setSubnav(false);
    }, [setSubnav]);

    const navItems = useMemo(() => {
      const baseItems = navItemList.filter(
        (item) => item.label !== "관리자 로그인"
      );

      return baseItems.map((item) => (
        <Link onClick={toggleNav} href={item.href} key={item.label}>
          <li
            className={`border-b border-tertiary dark:border-light text-center text-sm leading-10 ${
              path === item.href ? "text-tertiary" : ""
            }`}
          >
            {item.label}
          </li>
        </Link>
      ));
    }, [path, toggleNav]);

    const handleLogout = useCallback(() => {
      logout();
      toggleNav();
    }, [logout, toggleNav]);

    return (
      <nav className="absolute top-12 left-0 z-50 w-full h-[calc(100vh-3rem)] py-10 px-4 animate-opacityEffect bg-secondary dark:bg-dark dark:text-secondary mobile:block laptop:hidden desktop:hidden">
        <ul className="flex flex-col justify-center gap-4">
          {navItems}
          {isLoggedIn ? (
            <li
              className="border-b border-tertiary dark:border-light text-center text-sm leading-10 cursor-pointer"
              onClick={handleLogout}
            >
              <div className="flex flex-col items-center gap-1">
                <span>로그아웃</span>
              </div>
            </li>
          ) : (
            <Link onClick={toggleNav} href="/admin/login">
              <li className="border-b border-tertiary dark:border-light text-center text-sm leading-10">
                관리자 로그인
              </li>
            </Link>
          )}
        </ul>
      </nav>
    );
  }
);

MobileSubnav.displayName = "MobileSubnav";

export default MobileSubnav;
