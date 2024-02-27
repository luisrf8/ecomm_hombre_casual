/** @type {import('next').NextConfig} */
const {parsed:env} = require('dotenv').config();
const nextConfig = {
  env
}
const withPWA = require('next-pwa')({
  pwa: {
    dest: 'public', // Path where PWA-related files are generated
    register: true,
    scope: '/',
    sw: 'service-worker.js',
    // Other PWA-related configuration options if needed
  }
});

module.exports = {
  ...withPWA, // Merge the PWA configuration with other configurations
  ...nextConfig,
  eslint: {
    ignoreDuringBuilds: true
  },
  experimental: {
    serverActions: true,
    missingSuspenseWithCSRBailout: false,
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true
      }
    ];
  }
};
