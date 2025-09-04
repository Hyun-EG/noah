"use client";

import { cva, VariantProps } from "class-variance-authority";
import clsx from "clsx";
import React, { useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

interface ToggleThemeProps extends VariantProps<typeof toggleVariants> {
  className?: string;
}

const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-full p-2",
  {
    variants: {
      size: {
        responsive: "h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12",
      },
      defaultVariants: {
        themeMode: "sun",
        size: "responsive",
      },
    },
  }
);

const ToggleTheme = ({ className, size }: ToggleThemeProps) => {
  const [theme, setTheme] = useState("sun");
  return (
    <button
      onClick={() => {
        setTheme(theme === "sun" ? "moon" : "sun");
      }}
      className={clsx(toggleVariants({ size }), className)}
    >
      {theme === "sun" ? (
        <FaSun fill="orange" size={24} />
      ) : (
        <FaMoon fill="yellow" size={24} />
      )}
    </button>
  );
};

export default ToggleTheme;
