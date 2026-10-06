import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Re-check images after a minute, so swapping in the final mascot/logo shows up quickly
    minimumCacheTTL: 60,
  },
};

export default nextConfig;
