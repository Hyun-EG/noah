"use client";

import React, { useCallback, useMemo } from "react";
import { navItemList } from "./navItemList";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MobileSubnav = React.memo(
  ({ setSubnav }: { setSubnav: (state: boolean) => void }) => {
    const path = usePathname();

    const toggleNav = useCallback(() => {
      setSubnav(false);
    }, [setSubnav]);

    const navItems = useMemo(
      () =>
        navItemList.map((item) => (
          <Link onClick={toggleNav} href={item.href} key={item.label}>
            <li
              className={`border-b border-tertiary dark:border-light text-center text-sm leading-10 ${
                path === item.href ? "text-tertiary" : ""
              }`}
            >
              {item.label}
            </li>
          </Link>
        )),
      [path, toggleNav]
    );

    return (
      <nav className="absolute top-12 left-0 z-50 w-full h-[calc(100vh-3rem)] py-10 px-4 animate-opacityEffect bg-secondary dark:bg-dark dark:text-secondary mobile:block laptop:hidden desktop:hidden">
        <ul className="flex flex-col justify-center gap-4">{navItems}</ul>
      </nav>
    );
  }
);

MobileSubnav.displayName = "MobileSubnav";

export default MobileSubnav;
