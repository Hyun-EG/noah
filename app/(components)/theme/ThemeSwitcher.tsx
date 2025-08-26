"use client";

import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import React from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      aria-label="밝기 모드 변경하기"
      className="flex items-center leading-none"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <FaMoon fill="yellow" size={24} />
      ) : (
        <FaSun fill="orange" size={24} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
