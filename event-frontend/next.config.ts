import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      new URL("https://pophariini.com/**"),
      new URL("https://cdn1-production-images-kly.akamaized.net/**"),
      new URL(`https://res.cloudinary.com/dz0uoqa4b/image/upload/**`),
    ],
  },
};

export default nextConfig;
