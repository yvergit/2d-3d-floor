/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // This app is fully client-side (it bootstraps legacy scripts that require DOM).
  // Keeping it dynamic avoids static-export constraints on some Netlify setups.
};

export default nextConfig;
