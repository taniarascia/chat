const colors = require('tailwindcss/colors')
const theme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: [theme.fontFamily.sans],
    },
    colors: {
      green: colors.green,
      gray: colors.trueGray,
      white: colors.white,
      red: colors.red,
      blue: {
        extralight: '#c1c4f7',
        light: '#8e82f5',
        DEFAULT: '#4742db',
        dark: '#2a1bad',
      },
      dark: {
        DEFAULT: '#13202F',
      },
    },
    container: {
      padding: '2rem',
    },
    extend: {
      minWidth: {
        300: '300px',
      },
      width: {
        500: '500px',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'], // allow opacity change for disabled button
    },
  },
}
