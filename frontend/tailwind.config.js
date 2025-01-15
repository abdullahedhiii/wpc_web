import theme from "./theme"

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: theme.colors, // Custom colors
     
    },
  },
  plugins: [],
}