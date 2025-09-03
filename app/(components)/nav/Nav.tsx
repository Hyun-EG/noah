import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React from "react";
import NavItems from "./_components/NavItems";
import Link from "next/link";
import ToggleTheme from "../theme/ToggleTheme";

const navVariants = cva(
  "fixed top-0 left-0 z-50 w-full flex justify-between items-center text-secondary",
  {
    variants: {
      variant: {
        light: "bg-primary/90",
        dark: "bg-black/90",
      },
      size: {
        responsive:
          "h-12 px-2 mobile:h-12 mobile:px-4 laptop:h-16 laptop:px-12 desktop:h-16 desktop:px-40",
      },
    },
    defaultVariants: {
      variant: "light",
      size: "responsive",
    },
  }
);

interface NavProps extends VariantProps<typeof navVariants> {
  className?: string;
}

export const Nav = ({ variant, size, className }: NavProps) => {
  return (
    <header>
      <nav className={clsx(navVariants({ variant, size }), className)}>
        <div>
          <Link href="/" aria-label="홈으로 이동">
            <span className="text-xl font-bold hover:animate-navItemHoverEffect">
              NOAH DEV.
            </span>
          </Link>
        </div>
        <ToggleTheme />
        <NavItems />
      </nav>
    </header>
  );
};
