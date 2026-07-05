import { createMDX } from "fumadocs-mdx/next";

// Served from the custom domain react.hbui.dev (public/CNAME) at the
// domain root — no basePath needed. If the custom domain is ever removed,
// GitHub Pages serves the site under /hummingbird-react/ again and this
// must be set back to "/hummingbird-react" for deploys.
const basePath = "";

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
