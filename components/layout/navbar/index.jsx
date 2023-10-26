'use client'
import clsx from 'clsx';
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import Favorite from './favorite';
import MobileMenu from './mobile-menu';
import Search from './search';

export default function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    // Verifica si la vista es móvil cuando se carga la página y cada vez que cambie el tamaño de la ventana.
    function checkIfMobileView() {
      setIsMobileView(window.innerWidth <= 768); // Ajusta este valor según tus necesidades.
    }

    checkIfMobileView();

    window.addEventListener('resize', checkIfMobileView);

    return () => {
      window.removeEventListener('resize', checkIfMobileView);
    };
  }, []);
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
    { title: 'About ', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title: 'Products', path: '/search' },
    { title: 'About ', path: '/about' },
    { title: 'Contact', path: '/contact' },
    { title: 'Products', path: '/search' },
    { title: 'About ', path: '/about' },
    { title: 'Contact', path: '/contact' },
    // { title: 'Download App', path: '/sw.js' },
  ];

  return (
    <nav>
      <div className="relative flex items-center">
        <div className="flex w-full items-center justify-evenly">
          <div className="md:hidden flex justify-center w-1/3">
            <MobileMenu menu={menuItems} />
          </div>
          <div className="flex w-full justify-center md:w-1/3">
            <Link href="/" className="flex w-full items-center justify-center md:w-auto">
              <LogoSquare />
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            <Search />
          </div>
          <div className="flex justify-center gap-5 md:w-1/3 xs:w-[4rem]">
            <div className="hidden flex-none md:block">
              <Favorite 
                className={clsx('transition-all ease-in-out hover:scale-110')}
              />
            </div>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
      {isMobileView ? ("") : (
        <div className="flex justify-center p-6 bg-gray-100">
          <div className="flex w-full md:w-1/3 justify-evenly ">
            <ul className="hidden gap-6 text-sm md:flex md:items-center"
            style={{ fontWeight: "600"}}>
              {menuItems.map((item) => (
                <li key={item.title}>
                  <Link
                    href={item.path}
                    className="text-neutral-700 underline-offset-4 hover:text-black hover:underline "
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
}
