/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  // Add this if you're using app router
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig;