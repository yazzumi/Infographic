/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{html,php,js}",
    "./*.{html,php,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['"Open Sans"', 'sans-serif'],
    },
    },
  },
  plugins: [],
}

