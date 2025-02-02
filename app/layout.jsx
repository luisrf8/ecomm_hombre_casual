"use client";
import Navbar from 'components/layout/navbar';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { Provider } from 'react-redux';
import { store } from '../lib/store'; // Asegúrate de importar tu store
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="Hombre Casual" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Hombre Casual" />
        <meta name="description" content="Tienda Online" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 ">
        <Provider store={store}>
          {pathname !== '/login' && pathname !== '/register' && <Navbar />}
          <Suspense fallback={<div>Loading...</div>}>
            <main>{children}</main>
          </Suspense>
        </Provider>
      </body>
    </html>
  );
}
