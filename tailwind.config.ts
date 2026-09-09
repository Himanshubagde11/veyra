import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // VEYRA Brand Colors
        veyra: {
          aubergine: "#241326",
          coral: "#E76F51",
          chartreuse: "#C7F36B",
          porcelain: "#F7F3ED",
          champagne: "#F4EBDD",
          obsidian: "#120B15",
          // Functional shades
          "aubergine-light": "#3a2340",
          "aubergine-dark": "#1a0d1c",
          "coral-light": "#ee8e76",
          "coral-dark": "#c95a3e",
          "chartreuse-light": "#d6f794",
          "chartreuse-dark": "#a8d44d",
          "porcelain-warm": "#faf7f2",
          "champagne-deep": "#ede1cf",
        },
      },
      fontFamily: {
        serif: ["var(--font-dm-serif)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Premium editorial scale
        "display-xl": ["clamp(3.5rem, 8vw, 7rem)", { lineHeight: "0.95", letterSpacing: "-0.03em" }],
        "display-lg": ["clamp(2.75rem, 6vw, 5rem)", { lineHeight: "0.98", letterSpacing: "-0.025em" }],
        "display": ["clamp(2rem, 4vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "heading-lg": ["clamp(1.75rem, 3vw, 2.5rem)", { lineHeight: "1.1", letterSpacing: "-0.015em" }],
        "heading": ["clamp(1.25rem, 2vw, 1.75rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        "heading-sm": ["clamp(1rem, 1.5vw, 1.25rem)", { lineHeight: "1.3", letterSpacing: "-0.005em" }],
        "body-lg": ["1.125rem", { lineHeight: "1.65" }],
        "body": ["1rem", { lineHeight: "1.6" }],
        "body-sm": ["0.875rem", { lineHeight: "1.55" }],
        "caption": ["0.8125rem", { lineHeight: "1.5" }],
        "overline": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.08em" }],
        "price": ["1.25rem", { lineHeight: "1", letterSpacing: "-0.01em", fontWeight: "600" }],
        "price-lg": ["1.75rem", { lineHeight: "1", letterSpacing: "-0.015em", fontWeight: "600" }],
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
        "38": "9.5rem",
      },
      maxWidth: {
        "8xl": "88rem",
        "9xl": "96rem",
      },
      borderRadius: {
        "sm": "0.25rem",
        "DEFAULT": "0.375rem",
        "md": "0.5rem",
        "lg": "0.75rem",
        "xl": "1rem",
      },
      boxShadow: {
        "veyra-sm": "0 1px 3px rgba(18, 11, 21, 0.06), 0 1px 2px rgba(18, 11, 21, 0.04)",
        "veyra": "0 4px 12px rgba(18, 11, 21, 0.08), 0 2px 4px rgba(18, 11, 21, 0.04)",
        "veyra-lg": "0 12px 40px rgba(18, 11, 21, 0.12), 0 4px 12px rgba(18, 11, 21, 0.06)",
        "veyra-xl": "0 24px 60px rgba(18, 11, 21, 0.16), 0 8px 20px rgba(18, 11, 21, 0.08)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          from: { backgroundPosition: "200% 0" },
          to: { backgroundPosition: "-200% 0" },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
        "fade-up": "fade-up 0.6s ease-out",
        "slide-in-right": "slide-in-right 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "shimmer": "shimmer 2s infinite linear",
        "pulse-subtle": "pulse-subtle 2s infinite ease-in-out",
      },
      transitionDuration: {
        "250": "250ms",
        "350": "350ms",
        "400": "400ms",
      },
      aspectRatio: {
        "3/4": "3 / 4",
        "4/5": "4 / 5",
        "2/3": "2 / 3",
      },
    },
  },
  plugins: [],
};

export default config;
