/** @type {import('next').NextConfig} */
const { parsed: env } = require('dotenv').config();

const nextConfig = {
  env,
  images: {
    domains: ['localhost', '192.168.1.119'], // Agrega los dominios necesarios para cargar imágenes
  },
  eslint: {
    ignoreDuringBuilds: true, // Ignorar errores de ESLint durante el build
  },
  reactStrictMode: false, // Desactiva el modo estricto de React
  devIndicators: {
    autoPrerender: false, // Desactiva el prerender automático
  },
  async redirects() {
    return [
      {
        source: '/password',
        destination: '/',
        permanent: true, // Redirección permanente
      },
    ];
  },
  experimental: {
    serverActions: {}, // Configuración experimental
  },
};

module.exports = nextConfig;