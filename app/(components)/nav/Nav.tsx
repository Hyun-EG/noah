import React from "react";
import { cva } from "class-variance-authority";
import { navItems } from "./navItems";
import Link from "next/link";
import clsx from "clsx";

const navVariants = cva(
  "fixed top-0 left-0 flex items-center gap-2 w-full border-b " +
    "mobile:h-12 mobile:px-2 " +
    "tablet:h-16 tablet:px-4 " +
    "laptop:h-16 laptop:px-4 " +
    "desktop:h-16 desktop:px-4"
);

const Nav = () => {
  return (
    <nav className={navVariants()}>
      <Link className="px-2" href="/">
        <span
          className={clsx(
            "inline-flex items-center text-sm text-red-500 cursor-pointer"
          )}
        >
          KALI DEV.
        </span>
      </Link>
      {navItems.map((item) => (
        <ul key={item.link}>
          <Link href={item.link}>
            <li>{item.title}</li>
          </Link>
        </ul>
      ))}
    </nav>
  );
};

export default Nav;
