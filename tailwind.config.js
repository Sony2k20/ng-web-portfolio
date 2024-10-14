/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}", "./node_modules/flowbite/**/*.js"],
  theme: {
    theme: {
      letterSpacing: {
        tightest: "-.075em",
        tighter: "-.05em",
        tight: "-.025em",
        normal: "0",
        wide: ".025em",
        wider: ".05em",
        widest: ".25em",
      },
    },
    extend: {
      fontFamily: {
        aileron: ["Aileron", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        times: ['"Times New Roman"', "serif"],
        brittany: ["Brittany", "serif"],
        eyesome: ["Eyesome", "serif"],
        sans: ["Aileron", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#ece5ef",
          DEFAULT: "#DED3E3",
          dark: "#6c5574",
        },
        secondary: {
          light: "#f4f0f7",
          DEFAULT: "#f4f0f7",
          dark: "#f4f0f7",
        },
        black: {
          light: "#3c382f",
          DEFAULT: "#3c382f",
          dark: "#3c382f",
        },
        accent: {
          light: "#A8A2B4",
          DEFAULT: "#8277a3",
          dark: "#8277a3",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
    require("flowbite/plugin"),
  ],
};
