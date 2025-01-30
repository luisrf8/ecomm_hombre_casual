"use client";
import Navbar from 'components/layout/navbar';
import { Inter } from 'next/font/google';
import { usePathname } from 'next/navigation'; // Importa useRouter
import { Suspense } from 'react';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export default function RootLayout({ children }) {
  // const [user, setUser] = useState();
  const pathname = usePathname(); 

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   console.log("aqui token", token);
  //   if (token && token !== null) {
  //     try {
  //       setUser(token);
  //     } catch (err) {
  //       console.error('Token inválido');
  //     }
  //   }
  // }, []); // useEffect se ejecuta una vez cuando el componente se monta

  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="PWA App" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="PWA App" />
        <meta name="description" content="Best PWA App in the world" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/favicon-16x16.png" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#5bbad5" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="PWA App" />
        <meta name="twitter:description" content="Best PWA App in the world" />
        <meta name="twitter:creator" content="@DavidWShadow" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="PWA App" />
        <meta property="og:description" content="Best PWA App in the world" />
        <meta property="og:site_name" content="PWA App" />
        <link rel="apple-touch-icon" href="/icon.png"></link>
        <meta name="theme-color" content="#fff" />
      </head>
      <body className="bg-neutral-50 text-black selection:bg-teal-300 ">
        <>
          {pathname == '/login' || pathname == '/register' ? '' : <Navbar />}
        </>
        <Suspense fallback={<div>Loading...</div>}>
          <main>{children}</main>
        </Suspense>
      </body>
    </html>
  );
}
