/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "jmu4iygoe7nafjge.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
