"use client";

import { cva } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import { navItemList } from "./navItemList";
import Link from "next/link";
import { usePathname } from "next/navigation";

const SubnavVariants = cva(
  "absolute top-12 left-0 z-50 w-full h-[calc(100vh-3rem)] py-10 px-4 animate-opacityEffect bg-secondary dark:bg-dark dark:text-secondary mobile:block laptop:hidden desktop:hidden"
);

const navItemsVariants = cva("flex flex-col justify-center gap-4");

const MobileSubnav = () => {
  const path = usePathname();

  return (
    <nav className={clsx(SubnavVariants())}>
      <ul className={clsx(navItemsVariants())}>
        {navItemList.map((item) => (
          <Link href={item.href} key={item.label}>
            <li
              className={`border-b border-tertiary dark:border-light text-center text-sm leading-10 ${
                path === item.href ? "text-tertiary" : ""
              }`}
            >
              {item.label}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MobileSubnav;
