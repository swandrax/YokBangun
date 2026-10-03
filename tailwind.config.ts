import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1F5D45",
          dark: "#143F2F",
          light: "#2B7E5E",
          soft: "#EAF3EE",
        },
        clay: {
          DEFAULT: "#B4572F",
          soft: "#F8ECE5",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#F7F8F6",
          raised: "#EDF0EB",
        },
      },
    },
  },
  plugins: [],
};

export default config;
