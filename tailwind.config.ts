import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#EC4899",
          foreground: "#ffffff",
        },
        accent: {
          DEFAULT: "#3B82F6",
          foreground: "#ffffff",
        },
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(var(--spin-to))" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "confetti-1": {
          "0%": { transform: "translateY(0) rotateX(0) rotateY(0) rotate(0)" },
          "100%": { transform: "translateY(100vh) rotateX(720deg) rotateY(360deg) rotate(180deg)" },
        },
        "confetti-2": {
          "0%": { transform: "translateY(0) rotateX(0) rotateY(0) rotate(0)" },
          "100%": { transform: "translateY(100vh) rotateX(360deg) rotateY(720deg) rotate(-180deg)" },
        },
        "confetti-3": {
          "0%": { transform: "translateY(0) rotateX(0) rotateY(0) rotate(0)" },
          "100%": { transform: "translateY(100vh) rotateX(-360deg) rotateY(360deg) rotate(90deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-wheel": "spin var(--spin-duration) cubic-bezier(0.32, 0.94, 0.60, 1) forwards",
        "spin-slow": "spin-slow 20s linear infinite",
        "confetti-fall-1": "confetti-1 2.5s ease-in-out forwards",
        "confetti-fall-2": "confetti-2 3s ease-in-out forwards",
        "confetti-fall-3": "confetti-3 3.5s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;