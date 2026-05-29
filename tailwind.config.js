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
          ink: "#17202A",
          muted: "#64748B",
          panel: "#FFFFFF",
          soft: "#F5F7FA",
          accent: "#2563EB",
          success: "#16A34A",
          warning: "#D97706",
        },
      },
    },
  },
  plugins: [],
};
