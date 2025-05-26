import type { NextConfig } from 'next';
// const { PrismaPlugin } = require('@prisma/nextjs-monorepo-workaround-plugin');

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['@repo/ui'],
  // webpack: (config, { isServer }) => {
  //   if (isServer) {
  //     config.plugins = [...config.plugins, new PrismaPlugin()];
  //   }
  //   return config;
  // },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000'],
    },
    serverComponentsExternalPackages: ['@prisma/client', '.prisma/client'],
  },
};

export default nextConfig;
