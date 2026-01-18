import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "10.0.20.17",
      "localhost",
      "images.unsplash.com",
      "nyc3.digitaloceanspaces.com", // ✅ added
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "10.0.20.17",
        port: "5000",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "nyc3.digitaloceanspaces.com", // ✅ optional
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
