import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "au-primary-100": "#DBC2F2",
        "au-primary-300": "#B48DD9",
        "au-primary-500": "#A862EA",
        "au-primary-700": "#542680",
        "au-primary-900": "#2B084D",
        "au-gray-100": "#F2F2F2",
        "au-gray-300": "#D7D8D9",
        "au-gray-500": "#BDBFC1",
        "au-gray-700": "#A4A7AA",
        "au-gray-900": "#8B8F93",
        "au-dark-100": "#583E54",
        "au-dark-300": "#4B3748",
        "au-dark-500": "#4B3748",
        "au-dark-700": "#322730",
        "au-dark-900": "#261F25",
      },
    },
  },
  plugins: [],
} satisfies Config;
