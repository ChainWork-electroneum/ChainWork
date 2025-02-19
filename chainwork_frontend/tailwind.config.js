/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", 
  theme: {
    extend: {
      colors: {
        primary: "#1a1a1a", // Dark Black
        secondary: "#232323", // Slightly lighter Black
        tertiary: "#2e2e2e", // Even lighter Black
      },
    },
  },
  plugins: [],
};
