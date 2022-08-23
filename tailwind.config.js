const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode:'class',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens:{
      'esm':'350px',
      'exmd':'373px',
      ...defaultTheme.screens
    },
    extend: {
      screens:{
        xmd:'700px',
        xlg:'1150px',
      },
      colors:{
        whiteM:{
          text:'#212121',
          background:'#F5F5F5',
          gray:'#9E9E9E'
        }
      }
    },
  },
  plugins: [],
}
