/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBlue: "#0e0f1f", // Background color
        orange: "#f3a35c", // Button color
        hoverOrange: "#d87f3e", // Button hover color
      },
    },
  },
  plugins: [],
}