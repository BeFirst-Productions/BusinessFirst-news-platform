/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@businessfirst/shared-types', '@businessfirst/shared-utils'],
  experimental: {
    webpackBuildWorker: false,
  },
};

export default nextConfig;

