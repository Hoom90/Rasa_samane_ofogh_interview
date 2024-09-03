/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF8080",
        secondary: "#FFCF96",
        antiPrimary: "#F6FDC3",
        antiSecondary: "#CDFAD5",
      },
    },
  },
  plugins: [],
};
