"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/public/icons/icon-logo-192x192.png";
import clsx from "clsx";
import { logoSize } from "../variants";

type LogoProps = { className?: string };

const Logo = ({ className }: LogoProps) => {
  const path = usePathname();
  const isHome = path === "/";
  return (
    <Link href="/" aria-label="홈으로 이동하기" title="Noah 로고">
      <Image
        className={clsx(
          "rounded-full cursor-pointer max-w-none hidden md:block",
          logoSize({ scale: "base" }),
          className
        )}
        src={logo}
        width={36}
        height={36}
        alt="Noah 홈페이지 로고"
        priority={isHome}
      />
      <p className="text-xl text-sky-500 font-bold block md:hidden dark:text-white">
        NOΛH
      </p>
    </Link>
  );
};

export default Logo;
