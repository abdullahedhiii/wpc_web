import theme from "./theme"
const defaultColors = require("tailwindcss/colors");


module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: theme.colors, 
     
    },
  },
  plugins: [],
  safelist: [
    'bg-blue-700',
    'bg-red-700',
    'bg-purple-700',
    'bg-green-700',
    'bg-gray-700',
    'text-blue-700',
    'text-red-500',
    'text-purple-500',
    'text-green-500',
    'border-gray-700'
    // Add more if you're using more colors dynamically
  ],
}