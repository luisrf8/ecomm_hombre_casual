/** @type {import('next').NextConfig} */
const { parsed: env } = require('dotenv').config();

const nextConfig = {
  env,
  images: {
    domains: ['localhost', '192.168.1.107'], // Agrega "localhost" aquí
    minimumCacheTTL: 60 * 60 * 24, // 1 día de caché
    loader: 'imgix', // O 'default', dependiendo de tu configuración
    path: '', // Dejar vacío para deshabilitar la optimización
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  reactStrictMode: false, // O dejar en true si prefieres ver los errores en un modal
  devIndicators: {
    autoPrerender: false,
    allowedDevOrigins: ['http://192.168.1.107'], // Ajusta según sea necesario
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

// Configuración final combinada
module.exports = {
  ...withPWA(nextConfig),
  experimental: {
    serverActions: {}, // Establecer como objeto vacío
  },
};
