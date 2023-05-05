/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
const defaultTheme = require('tailwindcss/defaultTheme');

// eslint-disable-next-line no-undef
module.exports = {
  content: ['./index.html', './src/**/*.tsx'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Yantramanav"', ...defaultTheme.fontFamily.sans],
        heading: ['"Teko"', ...defaultTheme.fontFamily.sans],
        mono: ['"Noto Sans Mono"', ...defaultTheme.fontFamily.mono],
      },
      colors: {
        invBlue: '#324376',
        invPrimary: '#F5DD90',
        invSecondary: '#FFFFFF',
      },
      screens: {
        xs: '360px',
      },
    },
  },
  plugins: [],
};
