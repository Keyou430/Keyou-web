import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0B0F19",
        surface: "rgba(255,255,255,0.04)",
        border: "rgba(255,255,255,0.08)",
        foreground: "#e2e8f0",
        muted: "#94a3b8",
        dim: "#64748b",
        accent: {
          DEFAULT: "#06b6d4",
          blue: "#3b82f6",
          cyan: "#22d3ee",
        },
      },
      fontFamily: {
        mono: [
          "'Geist Mono'",
          "'SF Mono'",
          "'Cascadia Code'",
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
        sans: [
          "'Geist'",
          "'Inter'",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
        "dot-matrix":
          "radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)",
        "glow-top":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(6,182,212,0.08) 0%, transparent 60%)",
        "glow-bottom":
          "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(59,130,246,0.05) 0%, transparent 50%)",
      },
      backgroundSize: {
        grid: "64px 64px",
        dot: "20px 20px",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        blink: "blink 0.8s steps(1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
