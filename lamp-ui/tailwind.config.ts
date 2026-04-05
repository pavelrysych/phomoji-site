import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        border: "var(--border)",
        ring: "var(--ring)",
      },
      backgroundImage: {
        // Lamp / conic glow (Aceternity-style): uses --tw-gradient-stops + [--conic-position]
        "gradient-conic":
          "conic-gradient(var(--conic-position), var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
} satisfies Config;
