/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {
      screens: {
        mobile: "375px",
        laptop: "1024px",
        desktop: "1280px",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // moveFadeIn: {
        //   "0%": { opacity: "0", transform: "translateY(-40px)" },
        //   "100%": { opacity: "1", transform: "translateY(0)" },
        // },
      },
      animation: {
        // moveFadeIn: "moveFadeIn 0.5s ease-in-out",
        fadeIn: "fadeIn 0.5s ease-in-out",
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
