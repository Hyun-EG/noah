"use client";

import Link from "next/link";
import React, { useState } from "react";
import { FaGithub, FaEnvelope, FaBars, FaTimes } from "react-icons/fa";
import { navItemList } from "./navItemList";
import { usePathname } from "next/navigation";
import MobileSubnav from "./MobileSubnav";

const NavItems = () => {
  const [subnav, setSubnav] = useState(false);
  const path = usePathname();
  return (
    <>
      <ul className="items-center gap-4 mobile:hidden laptop:flex desktop:flex">
        {navItemList.map((item) => (
          <Link key={item.label} href={item.href}>
            <li
              className={`text-secondary hover:animate-navItemHoverEffect ${
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
            <FaGithub fill="#FADBC8" size={20} />
          </li>
        </Link>
        <Link href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}>
          <li>
            <FaEnvelope fill="#FADBC8" size={20} />
          </li>
        </Link>
      </ul>
      <ul className="items-center gap-4 mobile:flex laptop:hidden desktop:hidden">
        <Link href="/">
          <li className="transition-all duration-500 ease-in-out transform hover:scale-110">
            {subnav ? (
              <FaTimes
                fill="#FADBC8"
                size={24}
                onClick={() => {
                  setSubnav(false);
                }}
              />
            ) : (
              <FaBars
                fill="#FADBC8"
                size={24}
                onClick={() => {
                  setSubnav(true);
                }}
              />
            )}
          </li>
        </Link>
      </ul>
      {subnav && <MobileSubnav />}
    </>
  );
};

export default NavItems;
