import { useTheme } from "next-themes";
import { FaSun, FaMoon } from "react-icons/fa";
import React from "react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <FaMoon aria-label="밝은 모드로 전환하기" fill="yellow" size={24} />
      ) : (
        <FaSun aria-label="다크 모드로 전환하기" size={24} />
      )}
    </button>
  );
};

export default ThemeSwitcher;
