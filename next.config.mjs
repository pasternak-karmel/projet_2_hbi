/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   trustHost: true,
  // },
  images: {
    remotePatterns: [
      {
        hostname: "files.edgestore.dev",
      },
      {
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
