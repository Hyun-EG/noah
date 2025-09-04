"use client";

import Link from "next/link";
import React from "react";
import { FaGithub, FaEnvelope, FaBars } from "react-icons/fa";
import { navItemList } from "./navItemList";
import { usePathname } from "next/navigation";

const NavItems = () => {
  const path = usePathname();
  return (
    <>
      <ul className="items-center gap-4 mobile:hidden laptop:flex desktop:flex">
        {navItemList.map((item) => (
          <Link key={item.label} href={item.href}>
            <li
              className={`hover:animate-navItemHoverEffect ${
                path === item.href ? "text-tertiary underline" : ""
              }`}
            >
              {item.label}
            </li>
          </Link>
        ))}
        <Link
          href={process.env.NEXT_PUBLIC_GITHUB as string}
          aria-label="깃허브 바로가기"
          target="_blank"
        >
          <li>
            <FaGithub size={20} />
          </li>
        </Link>
        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          <li>
            <FaEnvelope size={20} />
          </li>
        </Link>
      </ul>
      <ul className="items-center gap-4 mobile:flex laptop:hidden desktop:hidden">
        <Link href="/">
          <li>
            <FaBars size={20} />
          </li>
        </Link>
      </ul>
    </>
  );
};

export default NavItems;
