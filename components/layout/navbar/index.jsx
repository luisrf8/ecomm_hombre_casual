'use client'
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import { Suspense, useState } from 'react';
import MobileMenu from './mobile-menu';
import Search from './search';
export default function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const handleInstallPWA = (event) => {
    // Comprueba si el evento 'beforeinstallprompt' está disponible en el navegador.
    if (deferredPrompt) {
      // Evita que el navegador muestre su propia solicitud de instalación.
      event.preventDefault();
  
      // Muestra una alerta o un mensaje personalizado para el usuario.
      if (window.confirm('¿Desea instalar esta aplicación?')) {
        // Si el usuario confirma, utiliza el evento 'beforeinstallprompt' para mostrar la solicitud de instalación.
        deferredPrompt.prompt();
  
        // Escucha la elección del usuario.
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('Usuario aceptó la instalación de la PWA');
          }
  
          // Limpia la variable deferredPrompt.
          setDeferredPrompt(null);
        });
      }
    }
  }
  
// const { SITE_NAME } = process.env;

  // Define datos simulados para el menú
  const menuItems = [
    { title: 'Products', path: '/search' },
    { title: 'About Us', path: '/about' },
    { title: 'Contact', path: '/contact' },
    // { title: 'Download App', path: '/sw.js' },
  ];

  return (
    <nav className="relative flex items-center justify-between p-4 lg:px-6">
      <div className="block flex-none md:hidden">
        <MobileMenu menu={menuItems} />
      </div>
      <div className="flex w-full items-center">
        <div className="flex w-full md:w-1/3">
          <Link href="/" className="mr-2 flex w-full items-center justify-center md:w-auto lg:mr-6">
            <LogoSquare />
            <div className="ml-2 flex-none text-sm font-medium uppercase md:hidden lg:block">
              {/* {SITE_NAME} */} STORE
            </div>
          </Link>
          <ul className="hidden gap-6 text-sm md:flex md:items-center">
            {menuItems.map((item) => (
              <li key={item.title}>
                <Link
                  href={item.path}
                  className="text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
          <button className='ml-6 text-neutral-500 underline-offset-4 hover:text-black hover:underline dark:text-neutral-400 dark:hover:text-neutral-300'
            onClick={() => handleInstallPWA()}
          >
            Download App
          </button>
        </div>
        <div className="hidden justify-center md:flex md:w-1/3">
          <Search />
        </div>
        <div className="flex justify-end md:w-1/3">
          <Suspense fallback={<OpenCart />}>
            <Cart />
          </Suspense>
        </div>
      </div>
    </nav>
  );
}
