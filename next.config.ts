import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/:any*',
        destination: '/'
      }
    ]
  }
};

export default nextConfig;
