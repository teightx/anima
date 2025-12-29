import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/history',
        destination: '/records?view=list',
        permanent: false,
      },
      {
        source: '/dashboard',
        destination: '/records?view=trends',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
