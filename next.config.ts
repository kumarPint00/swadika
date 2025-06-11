// @ts-nocheck
import type { NextConfig } from "next";
const withMDX = require('@next/mdx')();

const nextConfig: NextConfig = {
  /* config options here */
  ignoreBuildErrors: true,
   eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};
export default withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
});

export default nextConfig;
