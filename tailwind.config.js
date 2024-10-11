/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        aileron: ["Aileron", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        times: ['"Times New Roman"', "serif"],
        brittany: ["Brittany", "serif"],
        sans: ["Roboto", "sans-serif"],
      },
      colors: {
        primary: {
          light: "#DED3E3",
          DEFAULT: "#DED3E3",
          dark: "#DED3E3",
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
          light: "#8277a3",
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
  ],
};
