import type { NextConfig } from "next";
import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const nextConfig: NextConfig = {
  transpilePackages: ["aura-ui"],
  outputFileTracingRoot: process.cwd(),
};

export default withMDX(nextConfig);
