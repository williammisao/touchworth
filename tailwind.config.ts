import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        cream: "#f7f3ea",
        olive: "#273326",
        brown: "#6e4b36",
        sand: "#e9e1d3",
        champagne: "#d8c69f",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["DM Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
} satisfies Config;
