/** @type {import('next').NextConfig} */
const { parsed: env } = require('dotenv').config();

const nextConfig = {
  env,
  images: {
    domains: ['localhost', '192.168.1.119'], // Agrega "localhost" aquí
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false,
  devIndicators: {
    autoPrerender: false,
    allowedDevOrigins: ['http://192.168.1.119'], // Ajusta según sea necesario
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
};

const withPWA = require('next-pwa')({
  dest: 'public', // Path where PWA-related files are generated
  register: true,
  scope: '/',
  sw: 'service-worker.js',
  // Aquí puedes agregar más opciones relacionadas con PWA si es necesario
  disable: process.env.NODE_ENV === 'development', // Deshabilitar PWA en desarrollo (útil para testing)
});

module.exports = {
  ...withPWA(nextConfig),
  experimental: {
    serverActions: {}, // Establecer como objeto vacío
  },
};
