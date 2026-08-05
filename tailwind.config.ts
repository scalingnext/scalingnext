import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-core": "#0A0A0A",
        "dark-surface": "#161616",
        "dark-subtle": "#262626",
        "light-core": "#FFFFFF",
        "light-surface": "#F9F9F9",
        "light-subtle": "#E5E7EB",
        "brand-orange": "#FF5000",
        "dark-primary": "#FFFFFF",
        "dark-muted": "#888888",
        "light-primary": "#111111",
        "light-muted": "#666666",
      },
      fontFamily: {
        sans: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        handwritten: ["var(--font-caveat)", "cursive"],
      },
      fontWeight: {
        extrabold: "800",
      },
      letterSpacing: {
        tight: "-0.02em",
      },
    },
  },
  plugins: [],
};

export default config;
