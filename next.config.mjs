/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        // src: "https:files.edgestore.dev",
        // sizes: [16, 32, 48, 64, 96, 128, 256, 512],
        // placeholder: "blur",
        // blurDataURL: "https://example.com/blur-image1.jpg",
        hostname: "files.edgestore.dev",
      },
    ],
  },
};

export default nextConfig;
