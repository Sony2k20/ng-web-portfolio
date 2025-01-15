/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    theme: {
      letterSpacing: {
        tightest: '-.075em',
        tighter: '-.05em',
        tight: '-.025em',
        normal: '0',
        wide: '.025em',
        wider: '.05em',
        widest: '.25em',
      },
    },
    extend: {
      screens: {
        '3xl': '2160px',
      },
      backgroundImage: {
        'primary-dark-gradient':
          'linear-gradient(to right top, rgba(205, 201, 230, 0.8), rgba(190, 185, 217, 0.6), rgba(176, 170, 205, 0.6), rgba(162, 154, 192, 0.6), rgba(148, 139, 180, 0.4), rgba(148, 139, 180, 0.4), rgba(148, 139, 180, 0.4), rgba(148, 139, 180, 0.4), rgba(162, 154, 192, 0.4), rgba(176, 170, 205, 0.6), rgba(190, 185, 217, 0.6), rgba(205, 201, 230, 0.8))',
      },
      fontFamily: {
        aileron: ['Aileron'],
        eyesome: ['Eyesome', 'serif'],
        sans: ['Droid', 'sans-serif'],
      },
      colors: {
        primary: {
          light: '#ece5ef',
          DEFAULT: '#DED3E3',
          dark: '#CDC9E6',
        },
        secondary: {
          light: '#f4f0f7',
          DEFAULT: '#f4f0f7',
          dark: '#d3cfe5',
        },
        black: {
          light: '#3c382f',
          DEFAULT: '#3c382f',
          dark: '#3c382f',
        },
        accent: {
          light: '#9c788a',
          DEFAULT: '#8277a3',
          dark: '#8277a3',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
