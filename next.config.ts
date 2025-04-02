import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "picsum.photos",
      "randomuser.me",
      "alstein-dev-storage.s3.us-east-1.amazonaws.com",
    ],
  },
};

module.exports = bundleAnalyzer(nextConfig);
