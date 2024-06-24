/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
import forms from '@tailwindcss/forms'


export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",    
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"Inter var"', ...defaultTheme.fontFamily.sans],
      },
    }
  },
  plugins: [
    forms,
  ],
}

