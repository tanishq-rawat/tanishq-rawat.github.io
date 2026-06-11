import localFont from "next/font/local";

export const spaceGrotesk = localFont({
  variable: "--font-space-grotesk",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  src: [
    { path: "./fonts/space-grotesk-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/space-grotesk-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/space-grotesk-latin-600-normal.woff2", weight: "600", style: "normal" },
    { path: "./fonts/space-grotesk-latin-700-normal.woff2", weight: "700", style: "normal" },
  ],
});

export const geistSans = localFont({
  variable: "--font-geist-sans",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
  src: [
    { path: "./fonts/geist-sans-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/geist-sans-latin-500-normal.woff2", weight: "500", style: "normal" },
    { path: "./fonts/geist-sans-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
});

export const jetbrainsMono = localFont({
  variable: "--font-jetbrains-mono",
  display: "swap",
  fallback: ["ui-monospace", "monospace"],
  src: [
    { path: "./fonts/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});
