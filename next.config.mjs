/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "files.edgestore.dev",
      },
      {
        // protocol: "https",
        hostname: "images.pexels.com",
      },
    ],
  },
};

export default nextConfig;
