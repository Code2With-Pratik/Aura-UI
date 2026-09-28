import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  transpilePackages: ["aura-ui"],
  outputFileTracingRoot: process.cwd(),
  async rewrites() {
    return [{ source: "/fonts/:slug.css", destination: "/fonts/:slug" }];
  },
};

export default withMDX(nextConfig);
