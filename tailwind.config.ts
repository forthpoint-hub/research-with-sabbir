import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0E1420",
        "ink-soft": "#161D2C",
        "ink-raised": "#1C2436",
        line: "#2A3242",
        paper: "#EDEAE1",
        "paper-dim": "#A9AEBE",
        gold: "#C99A4B",
        signal: "#4FA490",
        alert: "#C96B4B",
      },
      fontFamily: {
        serif: ["'Source Serif 4'", "Georgia", "serif"],
        sans: ["'IBM Plex Sans'", "system-ui", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};

export default config;
