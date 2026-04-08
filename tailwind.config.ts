import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["Quicksand", "sans-serif"],
        headline: ["Playfair Display", "serif"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Custom colors for the quiz
        "princess-pink": {
          light: "#ffe4f0",
          DEFAULT: "#ffd6f0",
        },
        "princess-purple": "#e8d5ff",
        "brand-text": "#7B3F6E",
        "brand-text-secondary": "#C06090",
        "brand-gold": {
          DEFAULT: "#FFD700",
          dark: "#DAA520",
          light: "#FFF0A0",
          darker: "#B8860B",
        },
        "feedback-correct": "#A8E6A3",
        "feedback-wrong": "#FFB3B3",
        "button-bg": "#FFF0F8",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "cloud-move": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(calc(100vw + 100%))" },
        },
        pulsate: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.3" },
          "50%": { transform: "scale(1.05)", opacity: "0.4" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(0.8)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "10%, 30%, 50%, 70%, 90%": { transform: "translateX(-5px)" },
          "20%, 40%, 60%, 80%": { transform: "translateX(5px)" },
        },
        "glow-pulse": {
          "0%, 100%": { transform: "scale(1)", boxShadow: "0 0 5px #A8E6A3" },
          "50%": {
            transform: "scale(1.02)",
            boxShadow: "0 0 20px 5px rgba(168, 230, 163, 0.7)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" },
        },
        "fade-in-scale-up": {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "fade-out-scale-down": {
          "0%": { opacity: "1", transform: "scale(1)" },
          "100%": { opacity: "0", transform: "scale(0.9)" },
        },
        'float-up': {
            '0%': { transform: 'translateY(0) scale(0.8)', opacity: '1' },
            '100%': { transform: 'translateY(-150px) scale(1.2)', opacity: '0' },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "cloud-move": "cloud-move linear infinite",
        pulsate: "pulsate 5s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite alternate",
        shake: "shake 0.5s ease-in-out",
        "glow-pulse": "glow-pulse 1s ease-in-out",
        shimmer: "shimmer 3s linear infinite",
        "fade-in-scale-up": "fade-in-scale-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-out-scale-down": "fade-out-scale-down 0.4s cubic-bezier(0.7, 0, 0.84, 0) forwards",
        'float-up': 'float-up 1.5s ease-out forwards',
      },
      boxShadow: {
        'gold-frame': '0 0 0 4px #FFF0A0, 0 0 0 8px #B8860B, 0 0 20px 4px rgba(218,165,32,0.6)',
        'gold-frame-inset': 'inset 0 0 15px rgba(255,215,0,0.3)',
      }
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
