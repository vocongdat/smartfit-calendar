import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — driven by CSS variables in index.css (light + dark)
        bg: 'rgb(var(--bg) / <alpha-value>)',
        panel: 'rgb(var(--panel) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        card2: 'rgb(var(--card-2) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        line2: 'rgb(var(--line-2) / <alpha-value>)',
        content: 'rgb(var(--content) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        subtle: 'rgb(var(--subtle) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',
        accentText: 'rgb(var(--accent-text) / <alpha-value>)',
        accentfg: 'rgb(var(--accent-fg) / <alpha-value>)',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'Barlow', 'system-ui', 'sans-serif'],
        sans: ['Barlow', 'system-ui', '-apple-system', 'sans-serif'],
      },
      fontSize: {
        xxs: ['11px', '15px'],
      },
      borderRadius: {
        xl: '14px',
        '2xl': '18px',
      },
      boxShadow: {
        card: '0 1px 2px rgb(var(--shadow) / 0.06), 0 8px 24px -16px rgb(var(--shadow) / 0.5)',
        lift: '0 16px 40px -12px rgb(var(--shadow) / 0.55), 0 0 0 1px rgb(var(--accent) / 0.45)',
        glow: '0 0 0 1px rgb(var(--accent) / 0.35), 0 10px 30px -12px rgb(var(--accent) / 0.35)',
        toggle: 'inset 0 1px 2px rgb(var(--shadow) / 0.4)',
      },
      keyframes: {
        'fade-up': {
          from: { opacity: '0', transform: 'translateY(10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.97)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'backdrop-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pop: {
          '0%': { transform: 'scale(0.9)' },
          '60%': { transform: 'scale(1.06)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both',
        'fade-in': 'fade-in 0.4s ease both',
        'scale-in': 'scale-in 0.28s cubic-bezier(0.22, 1, 0.36, 1) both',
        'backdrop-in': 'backdrop-in 0.25s ease both',
        pop: 'pop 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.app-h-screen': {
          height: '100vh',
          ['@supports (height: 100dvh)']: { height: '100dvh' },
        },
        '.app-min-h-screen': {
          minHeight: '100vh',
          ['@supports (height: 100dvh)']: { minHeight: '100dvh' },
        },
      });
    }),
  ],
};
