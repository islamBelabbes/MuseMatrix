/** @type {import('tailwindcss').Config} */
import { withUt } from "uploadthing/tw";

module.exports = withUt({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: ["Tajawal", "sans-serif"],
      colors: {
        Primary: "#4B6BFB",
        Secondary: "#F0F2F5",
      },
    },
  },
  plugins: [],
});
