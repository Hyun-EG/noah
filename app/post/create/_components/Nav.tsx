"use client";

import Link from "next/link";
import { HiChevronLeft } from "react-icons/hi";

const Nav = () => {
  return (
    <nav className="flex items-center justify-between w-full h-12 px-2">
      <ul className="inline-flex items-center">
        <Link className="inline-flex" href="/post">
          <li className="inline-flex">
            <HiChevronLeft size={24} />
            <span className="dark:text-light">게시물로 이동</span>
          </li>
        </Link>
      </ul>
      <ul></ul>
    </nav>
  );
};

export default Nav;
