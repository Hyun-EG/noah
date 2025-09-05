/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        mobile: "250px",
        laptop: "1024px",
        desktop: "1280px",
      },
      colors: {
        //주요 테마 색상
        primary: "#721D21",
        secondary: "#FADBC8",
        tertiary: "#ED7474",

        // 다크모드/라이트모드
        dark: "#121212",
        light: "#ffffff",
      },
      keyframes: {
        // Nav
        "nav-item-hover-effect": {
          "0%": { color: "#ffffff" },
          "100%": { color: "#ED7474" },
        },

        // 투명도 이펙트
        "opacity-effect": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },

        // Toast
        "toast-effect": {
          "0%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
          "50%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
          "100%": {
            transform: "translateX(100%)",
            opacity: "0",
          },
        },
      },
      animation: {
        navItemHoverEffect: "nav-item-hover-effect 0.5s ease-in-out forwards",
        opacityEffect: "opacity-effect 0.5s ease-in-out forwards",
        toastEffect: "toast-effect 2s ease-in-out forwards",
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".transition-slow-color": {
          transition: "color 0.5s ease-in-out",
        },
      });
    },
  ],
};
