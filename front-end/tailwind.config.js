/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d3b66" /* Dark Blue */,
        secondary: "#718096" /* Gray */,
        accent: "#00A8E8" /* Bright Blue */,
        background: "#F9FAFB" /* Light Gray */,
        blackText: "#1A202C" /* Black */,
      },
      fontFamily: {
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
        serif: [
          "ui-serif",
          "Georgia, Cambria",
          "Times New Roman",
          "Times",
          "serif",
        ],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
      },
      keyframes: {
        scrollUp: {
          "0%": { transform: "translate(-50%, 0)" },
          "100%": { transform: "translate(-50%, -50%)" },
        },
        scrollDown: {
          "0%": { transform: "translate(-50%, -50%)" },
          "100%": { transform: "translate(-50%, 0)" },
        },
      },
      animation: {
        "scroll-up": "scrollUp 18s linear infinite",
        "scroll-down": "scrollDown 18s linear infinite",
      },
    },
    plugins: [],
  },
};
