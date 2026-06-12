/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        navy:         "#1A2332",
        "blue-deep":  "#1E3A5F",
        "blue-mid":   "#4A90C4",
        "blue-light": "#EEF4FF",
        "green-vita": "#2ECC8B",
        "orange-alert": "#F5824D",
        cream:        "#F8F6F2",
      },
      fontFamily: {
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
      },
      keyframes: {
        pulse2: { "0%,100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
        ripple: {
          "0%":   { opacity: "0.6", transform: "translate(-50%,-50%) scale(0.95)" },
          "100%": { opacity: "0",   transform: "translate(-50%,-50%) scale(1.3)" },
        },
      },
      animation: {
        pulse2:         "pulse2 2s ease-in-out infinite",
        ripple:         "ripple 3s ease-out infinite",
        "ripple-delay": "ripple 3s ease-out 0.8s infinite",
      },
    },
  },
  plugins: [],
};
    