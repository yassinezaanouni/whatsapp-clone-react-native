/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "teal-green": "#128C7E", // Primary brand color
        "light-green": "#25D366", // Secondary brand color
        "teal-dark": "#075E54", // Dark teal variant
        blue: "#34B7F1", // Message bubble blue
        background: "#ECE5DD", // Chat background
        bubble: "#DCF8C6", // Message bubble green
        text: "#075E54", // Primary text color
        "secondary-text": "#667781", // Secondary text color
      },
    },
  },
  plugins: [],
};
