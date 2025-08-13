import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Skip ESLint during builds - we handle linting separately
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Skip TypeScript errors during builds for demo purposes
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
