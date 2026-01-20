/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      boxShadow: {
        soft: "0 12px 28px rgba(15, 23, 42, 0.12)",
        card: "0 10px 30px rgba(15, 23, 42, 0.12)"
      },
      colors: {
        brand: {
          50: "#eef6ff",
          100: "#d9e9ff",
          200: "#b9d4ff",
          300: "#8fb7ff",
          400: "#6091ff",
          500: "#3a6dff",
          600: "#2b50e6",
          700: "#243bb8",
          800: "#1f2f8d",
          900: "#1d2c70"
        }
      }
    }
  },
  plugins: []
};
