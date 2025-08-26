import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Custom luxury color palette
        navy: {
          50: '#f0f4f8',
          100: '#d9e2ec',
          200: '#bcccdc',
          300: '#9fb3c8',
          400: '#829ab1',
          500: '#627d98',
          600: '#486581',
          700: '#334e68',
          800: '#243b53',
          900: '#102a43',
          950: '#0a1929', // Deep navy
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#e3e3e3',
          200: '#c8c8c8',
          300: '#a4a4a4',
          400: '#818181',
          500: '#666666',
          600: '#515151',
          700: '#434343',
          800: '#383838',
          900: '#313131',
          950: '#1a1a1a', // Deep charcoal
        },
        'off-white': {
          50: '#ffffff',
          100: '#fefefe',
          200: '#fdfdfd',
          300: '#fbfbfb',
          400: '#f9f9f9',
          500: '#f7f7f7',
          600: '#f5f5f5',
          700: '#f3f3f3',
          800: '#f1f1f1',
          900: '#efefef',
          950: '#fafafa', // Main off-white
        },
        gold: {
          50: '#fffdf7',
          100: '#fffaeb',
          200: '#fff3c4',
          300: '#ffe999',
          400: '#ffdb5c',
          500: '#ffc107',
          600: '#d4a605',
          700: '#b8860b',
          800: '#9d6f0f',
          900: '#825d10',
          950: '#6b4a0a', // Deep gold
        },
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config; 