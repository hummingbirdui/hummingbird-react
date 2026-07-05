import { createMDX } from "fumadocs-mdx/next";

// Set GITHUB_PAGES=true when building for the project page at
// https://hummingbirdui.github.io/hummingbird-react/
const isGithubPages = process.env.GITHUB_PAGES === "true";
const basePath = isGithubPages ? "/hummingbird-react" : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@hummingbirdui/react"],
  output: "export",
  basePath,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
