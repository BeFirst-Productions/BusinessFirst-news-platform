/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@businessfirst/shared-types', '@businessfirst/shared-utils'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'businessfirst-storage.b-cdn.net',
      },
      {
        protocol: 'https',
        hostname: 'business-first.b-cdn.net',
      },
    ],
  },
};

export default nextConfig;
