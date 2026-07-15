import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "#0a0a0f",
        surface: "rgba(255,255,255,0.03)",
        border: "rgba(255,255,255,0.06)",
        foreground: "#f5f5f7",
        muted: "#a1a1aa",
        dim: "#71717a",
        accent: {
          DEFAULT: "#2997ff",
          blue: "#0a84ff",
          cyan: "#64d2ff",
        },
      },
      fontFamily: {
        sans: [
          "'SF Pro Display'",
          "'SF Pro Text'",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Helvetica Neue'",
          "'PingFang SC'",
          "sans-serif",
        ],
        mono: [
          "'SF Mono'",
          "'Geist Mono'",
          "'Cascadia Code'",
          "'JetBrains Mono'",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)",
        "dot-matrix":
          "radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px)",
        "glow-top":
          "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(41,151,255,0.06) 0%, transparent 60%)",
        "glow-bottom":
          "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(10,132,255,0.04) 0%, transparent 50%)",
      },
      backgroundSize: {
        grid: "80px 80px",
        dot: "20px 20px",
      },
      borderRadius: {
        apple: "12px",
        "apple-lg": "18px",
        "apple-xl": "22px",
      },
      animation: {
        "fade-in": "fadeIn 0.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
        "slide-up": "slideUp 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
        blink: "blink 1s steps(1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
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
