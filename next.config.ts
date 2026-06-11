import type { NextConfig } from "next";

// For GitHub Pages project sites, set NEXT_PUBLIC_BASE_PATH="/<repo-name>"
// at build time. Leave empty for Vercel or a user/root domain.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
