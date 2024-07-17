/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matte-black': '#1a1a1a',
        'soft-black': '#202020'
      },
      spacing: {
        '128': '32rem', // 512px
        '144': '36rem', // 576px
        '160': '40rem', // 640px
      },
    },
  },
  plugins: [],
}