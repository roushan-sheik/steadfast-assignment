import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "157.230.240.97",
        port: "8888",
        pathname: "/storage/**",
      },
    ],
  },
  typescript: {
    // This will ignore TypeScript errors during production builds
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
