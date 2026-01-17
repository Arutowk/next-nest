import { type NextConfig } from "next";

const path = require("path");

const nextConfig: NextConfig = {
  transpilePackages: ["@repo/ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "loremflickr.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "jzqfesxsndovtyoyqgpb.supabase.co",
        port: "",
        pathname: "/**",
      },
    ],
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
  experimental: {
    serverActions: { bodySizeLimit: "3mb" },
  },
};

export default nextConfig;
