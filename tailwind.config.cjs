/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'noto': ['Helvetica' ,'Noto Sans SC', 'sans-serif']
      }
    },
  },
  plugins: [],
}
