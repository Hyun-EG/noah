/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.tsx"],
  theme: {
    extend: {},
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
