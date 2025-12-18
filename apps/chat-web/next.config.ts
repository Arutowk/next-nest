import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/conversations",
        permanent: true,
      },
    ];
  },
  // rewrites() {
  //   return [
  //     {
  //       source: "/back/:path*",
  //       destination: "http://localhost:3001/:path*",
  //     },
  //   ];
  // },
};

export default nextConfig;
