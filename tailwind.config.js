/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jordan-red': '#E50914',
      },
      fontFamily: {
        'bebas': ['"Bebas Neue"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
