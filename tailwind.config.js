/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./docs/**/*.{html,php,js}",  
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

