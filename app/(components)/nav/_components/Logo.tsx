"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icons/icon-logo-192x192.png";

const Logo = () => {
  const path = usePathname();
  const isHome = path === "/";
  return (
    <Link href="/" aria-label="홈으로 이동하기" title="Noah 로고">
      <Image
        className="rounded-full cursor-pointer"
        src={logo}
        width={36}
        height={36}
        alt="Noah 홈페이지 로고"
        priority={isHome}
      />
    </Link>
  );
};

export default Logo;
