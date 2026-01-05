import type { Config } from "tailwindcss";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [scrollbar({ nocompatible: true })],
} satisfies Config;