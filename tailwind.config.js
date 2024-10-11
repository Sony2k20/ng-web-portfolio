/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
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
          light: "",
          DEFAULT: "",
          dark: "",
        },
      },
    },
  },
  //ToDO fontFamily
  // fontFamily: {
  // },
  plugins: [
    require("@tailwindcss/aspect-ratio"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};
