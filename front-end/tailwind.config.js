/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0d3b66" /* Bleu Fonce */,
        secondary: "#718096" /* gris */,
        accent: "#00A8E8" /* Bleu Clair */,
        background: "#F9FAFB" /* Gris fonce */,
        blackText: "#1A202C" /* Noir */,
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
    },
    plugins: [],
  },
};
