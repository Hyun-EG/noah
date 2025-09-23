"use client";

import Link from "next/link";
import React, { useCallback, useMemo, useState } from "react";
import { FaGithub, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { navItemList } from "./navItemList";
import { usePathname } from "next/navigation";
import MobileSubnav from "./MobileSubnav";
import { useAuthStore } from "@/lib/store/authStore";

interface NavItem {
  label: string;
  href: string;
  onClick?: () => void;
}

const NavItems = React.memo(() => {
  const [subnav, setSubnav] = useState(false);
  const path = usePathname();
  const { isLoggedIn, logout } = useAuthStore();

  const navItems = useMemo((): NavItem[] => {
    const baseItems = navItemList.filter(
      (item) => item.label !== "관리자 로그인"
    );

    if (isLoggedIn) {
      return [
        ...baseItems,
        {
          label: "로그아웃",
          href: "#",
          onClick: logout,
        },
      ];
    } else {
      return [
        ...baseItems,
        {
          label: "관리자 로그인",
          href: "/admin/login",
        },
      ];
    }
  }, [isLoggedIn, logout]);

  const renderNavItems = useMemo(
    () =>
      navItems.map((item) => (
        <Link key={item.label} href={item.href}>
          <li
            className={`text-secondary hover:animate-navItemHoverEffect ${
              path === item.href ? "text-tertiary underline" : ""
            }`}
            onClick={item.onClick}
          >
            {isLoggedIn && item.label === "로그아웃" ? (
              <span className="flex items-center gap-2">
                <span>{item.label}</span>
              </span>
            ) : (
              item.label
            )}
          </li>
        </Link>
      )),
    [navItems, path, isLoggedIn]
  );

  const toggleSubnav = useCallback(() => {
    setSubnav((prev) => !prev);
  }, []);

  return (
    <>
      <ul className="items-center gap-4 mobile:hidden laptop:flex desktop:flex">
        {renderNavItems}
        <Link
          href={process.env.NEXT_PUBLIC_GITHUB as string}
          aria-label="깃허브 바로가기"
          target="_blank"
        >
          <li>
            <FaGithub fill="#FADBC8" size={20} />
          </li>
        </Link>
        <Link
          href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
          aria-label="이메일 보내기"
        >
          <li>
            <FaEnvelope fill="#FADBC8" size={20} />
          </li>
        </Link>
      </ul>
      <ul className="items-center gap-4 mobile:flex laptop:hidden desktop:hidden">
        <button
          onClick={toggleSubnav}
          className="transition-all duration-500 ease-in-out transform hover:scale-110"
          aria-expanded={subnav}
          aria-controls="mobile-menu"
          aria-label={subnav ? "메뉴 닫기" : "메뉴 열기"}
        >
          {subnav ? (
            <FaTimes fill="#FADBC8" size={24} />
          ) : (
            <FaBars fill="#FADBC8" size={24} />
          )}
        </button>
      </ul>
      {subnav && <MobileSubnav setSubnav={setSubnav} />}
    </>
  );
});

NavItems.displayName = "NavItems";

export default NavItems;
