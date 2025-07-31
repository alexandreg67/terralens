import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        terralens: {
          "primary": "#2C7A7B",
          "secondary": "#1A202C", 
          "accent": "#E53E3E",
          "neutral": "#374151",
          "base-100": "#F7FAFC",
          "base-200": "#EDF2F7",
          "base-300": "#E2E8F0",
          "info": "#3182CE",
          "success": "#38A169",
          "warning": "#D69E2E",
          "error": "#E53E3E",
        },
      },
    ],
    base: true,
    styled: true,
    utils: true,
  },
};
export default config;