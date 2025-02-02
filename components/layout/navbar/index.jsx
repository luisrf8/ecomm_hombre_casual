'use client'
import Cart from 'components/cart';
import OpenCart from 'components/cart/open-cart';
import LoadingDots from 'components/loading-dots';
import LogoSquare from 'components/logo-square';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import api from '../../../lib/axios';
import Favorite from './favorite';
import MobileMenu from './mobile-menu';

// import Search from './search';

export default function Navbar() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [parentCategories, setParentCategories] = useState(null); 
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    function checkIfMobileView() {
      setIsMobileView(window.innerWidth <= 768); // Ajusta este valor según tus necesidades.
    }

    checkIfMobileView();

    window.addEventListener('resize', checkIfMobileView);
    return () => {
      window.removeEventListener('resize', checkIfMobileView);
    };
  }, []);

  useEffect(() => {
    if (!hasFetchedData) {
      getParentCategories()
    }
  }, [parentCategories]);
  
  function getParentCategories() {
  api.get("api/categories")
  .then(response => {
      setParentCategories(response.data)
      setHasFetchedData(true); 
    })
    .catch(error => {
      console.error('Hubo un error al hacer la solicitud GET:', error);
    });
  }
  const handleInstallPWA = (event) => {
    if (deferredPrompt) {
      event.preventDefault();
  
      if (window.confirm('¿Desea instalar esta aplicación?')) {
        deferredPrompt.prompt();
  
        deferredPrompt.userChoice.then((choiceResult) => {
          if (choiceResult.outcome === 'accepted') {
          }
  
          setDeferredPrompt(null);
        });
      }
    }
  }
  
  // Define datos simulados para el menú
  return (
    <div>
    <nav>
      <div className="relative flex items-center">
        <div className="flex w-full items-center justify-evenly pt-4 pb-4">
          <div className="md:hidden flex justify-center w-1/3">
            <MobileMenu menu={parentCategories} />
          </div>
          <div className="flex w-full justify-center md:w-1/3">
            <Link href="/" className="flex w-full items-center justify-center md:w-auto">
              <LogoSquare />
            </Link>
          </div>
          <div className="hidden justify-center md:flex md:w-1/3">
            {/* <Search /> */}
          </div>
          <div className="flex justify-center gap-5 md:w-1/3 xs:w-[4rem]">
            <div className="hidden flex-none md:block">
              <Favorite 
                className='transition-all ease-in-out hover:scale-110'
              />
            </div>
            <Suspense fallback={<OpenCart />}>
              <Cart />
            </Suspense>
          </div>
        </div>
      </div>
      {isMobileView ? ("") : (
        <div className="flex justify-center bg-gray-100 h-[5rem]">
          {!hasFetchedData ? (
            <LoadingDots className="bg-gray-900" />
          ) : (
            // Render the fetched data when available
            parentCategories ? (
              <ul className="flex hidden justify-evenly text-sm md:flex md:items-center" style={{ fontWeight: "600"}}>
                {parentCategories.map((item) => (
                  <li key={item} className="w-[10rem] flex justify-center">
                    <Link
                      href={`/search/${item.id}`}
                      className="text-neutral-700 underline-offset-4 hover:text-black hover:underline "
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : ("")
          )}
        </div>
      )}
    </nav>
    </div>
  );
}
