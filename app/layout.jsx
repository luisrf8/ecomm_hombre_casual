"use client";
import Navbar from 'components/layout/navbar';
import LoadingOverlay from 'components/loading-overlay';
import InstallPWAButton from 'components/pwa';
import InstallPromptIOS from 'components/pwaIos';

import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let previousPathname = pathname;

    const handleRouteChange = () => {
      setIsLoading(true);
    };

    if (previousPathname !== pathname) {
      handleRouteChange();
      previousPathname = pathname;
    }
  }, [pathname]);

  // Registro del Service Worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker
          .register('/sw.js')
          .then((reg) => console.log('Service Worker registrado:', reg))
          .catch((err) => console.error('Error al registrar el Service Worker:', err));
      });
    }
  }, []);

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Infinity Center" />
        <meta name="mobile-web-app-capable" content="yes"></meta>
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Infinity Center" />
        <meta name="description" content="Tienda Online" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="apple-touch-icon" href="/icon-192x192.png" />
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 ">
        <Provider store={store}>
          {isLoading && <LoadingOverlay />}
          {pathname !== '/login' && pathname !== '/register' && <Navbar />}
          <Suspense fallback={<div>Loading...</div>}>
            <main className={pathname !== '/login' && pathname !== '/register' ? 'mt-40' : ''}>
              {children}
            </main>
          </Suspense>
          <InstallPWAButton />
          <InstallPromptIOS />
        </Provider>
      </body>
    </html>
  );
}
