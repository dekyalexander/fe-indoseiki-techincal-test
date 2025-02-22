import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/signin',
        permanent: false,
      },
    ]
  }
};

export default nextConfig;
