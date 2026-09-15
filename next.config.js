const path = require('node:path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.resolve(__dirname),
    };

    return config;
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:${process.env.BACKEND_PORT || 3001}/api/:path*`,
      },
    ];
  },

  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT,OPTIONS' },
          {
            key: 'Access-Control-Allow-Headers',
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
        ],
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },

  poweredByHeader: false,

  compress: true,

  env: {
    BACKEND_PORT: process.env.BACKEND_PORT || '3001',
  },
};

module.exports = nextConfig;