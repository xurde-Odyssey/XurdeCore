/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      colors: {
        core: {
          ink: "rgb(var(--color-core-ink) / <alpha-value>)",
          muted: "rgb(var(--color-core-muted) / <alpha-value>)",
          panel: "rgb(var(--color-core-panel) / <alpha-value>)",
          soft: "rgb(var(--color-core-soft) / <alpha-value>)",
          accent: "rgb(var(--color-core-accent) / <alpha-value>)",
          success: "rgb(var(--color-core-success) / <alpha-value>)",
          warning: "rgb(var(--color-core-warning) / <alpha-value>)",
        },
      },
    },
  },
  plugins: [],
};
