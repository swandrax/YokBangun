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
          DEFAULT: "#D9531E",
          light: "#E26C3B",
          soft: "#FCF1EB",
        },
        clay: {
          DEFAULT: "#D9531E",
          soft: "#FCF1EB",
        },
        surface: {
          DEFAULT: "#FFFFFF",
          subtle: "#FBF9F7",
          raised: "#E8E2DA",
        },
      },
    },
  },
  plugins: [],
};

export default config;
