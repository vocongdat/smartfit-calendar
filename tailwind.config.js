import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        secondary: {
          800: '#5A57CB',
        },
        neutral: {
          50: '#F3F5F8',
          200: '#222426',
          300: '#DFDFDF',
          500: '#6A7988',
          700: '#728096',
          800: '#95A6B7',
          900: '#919CAD',
        },
      },
      fontSize: {
        xxs: ['10px', '14px'],
      },
      dropShadow: {
        'smart-fit': 'box-shadow: 0px 0px 4px 0px #0000001A',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.app-h-screen': {
          height: '100vh',

          ['@supports (height: 100dvh)']: {
            height: '100dvh',
          },
        },
        '.app-min-h-screen': {
          minHeight: '100vh',

          ['@supports (height: 100dvh)']: {
            minHeight: '100dvh',
          },
        },
      });
    }),
  ],
};
