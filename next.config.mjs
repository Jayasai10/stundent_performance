/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add this block to disable ESLint during the build
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;