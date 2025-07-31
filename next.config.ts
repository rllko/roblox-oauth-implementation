import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns:
      [new URL('https://tr.rbxcdn.com/**')]
  },
};

export default nextConfig;