/** @type {import('next').NextConfig} */
const { parsed: env } = require('dotenv').config();
const runtimeCaching = require('next-pwa/cache');
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development',
  runtimeCaching,
});

const nextConfig = {
  env,
  images: {
    domains: ['localhost', '192.168.1.119'],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  devIndicators: {
    autoPrerender: false,
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true,
      },
    ];
  },
  experimental: {
    serverActions: {},
  },
};

module.exports = withPWA(nextConfig);
