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
        primary: {
          light: '#4962AB',
          DEFAULT: '#324376',
          dark: '#253156',
        },
        secondary: {
          light: '#FAEEC7',
          DEFAULT: '#F5DD90',
          dark: '#EFCC57',
          darker: '#A88410',
        },
        tertiary: {
          DEFAULT: '#FFFFFF',
          grade1: '#F5F5F5',
          grade2: '#EBEBEB',
          grade3: '#E0E0E0',
          grade4: '#D6D6D6',
        },
      },
      screens: {
        xs: '360px',
        xms: '460px',
      },
    },
  },
  plugins: [
    // eslint-disable-next-line no-undef
    require('@tailwindcss/forms'),
  ],
};
