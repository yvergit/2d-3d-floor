/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // blueprint3d relies on DOM globals; keep things simple.
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;
