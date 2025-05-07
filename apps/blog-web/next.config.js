/** @type {import('next').NextConfig} */
module.exports = {
  transpilePackages: ['@repo/ui'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'loremflickr.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jzqfesxsndovtyoyqgpb.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};
