'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
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
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda

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
      getParentCategories();
    }
  }, [parentCategories]);

  function getParentCategories() {
    api.get("api/categories")
      .then(response => {
        setParentCategories(response.data);
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
            // Acción si el usuario acepta instalar la PWA
          }
  
          setDeferredPrompt(null);
        });
      }
    }
  };

  // Filtra las categorías basándose en el término de búsqueda
  const filteredCategories = parentCategories
    ? parentCategories.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) // Filtra por nombre de la categoría
      )
    : [];

  return (
    <div>
      <nav className='fixed top-0 z-50 w-full bg-white shadow-md dark:bg-black dark:text-white'>
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
              <form onSubmit={(e) => e.preventDefault()} className="w-max-[550px] relative w-full lg:w-80 xl:w-full inline-flex">
                <input
                  type="text"
                  name="search"
                  placeholder="Buscar"
                  autoComplete="off"
                  value={searchTerm} // Vinculamos el valor del input con el estado
                  onChange={(e) => setSearchTerm(e.target.value)} // Actualizamos el término de búsqueda
                  style={{ border: '1px solid #BABABA' }}
                  className="w-full border rounded-r bg-white px-4 py-4 text-sm text-black placeholder:text-neutral-800"
                />
                <div className="absolute right-0 top-0 mr-3 flex h-full items-center">
                  <MagnifyingGlassIcon className="h-7 text-neutral-400 font-bold" />
                </div>
              </form>
            </div>
            <div className="flex justify-center gap-5 md:w-1/3 xs:w-[4rem]">
              <div className="hidden flex-none md:block">
                <Favorite className='transition-all ease-in-out hover:scale-110' />
              </div>
    {/* <div className="flex items-center justify-center  bg-white dark:bg-gray-dark transition-all duration-300">
      <div className="p-8 rounded-lg shadow-lg bg-gray-100 dark:bg-gray-medium">
        <h2 className="text-2xl font-bold mb-4 text-black dark:text-white">Prueba del botón de tema</h2> */}
        {/* <ThemeToggle className="transition-all ease-in-out hover:scale-110" /> */}
      {/* </div>
    </div> */}
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
              // Renderiza las categorías filtradas
              filteredCategories.length > 0 && (
                <ul className="flex hidden justify-evenly text-sm md:flex md:items-center" style={{ fontWeight: "600" }}>
                  <li className="w-[10rem] flex justify-center">
                    <Link href="/search" className="text-neutral-700 underline-offset-4 hover:text-black hover:underline">
                      Todos
                    </Link>
                  </li>
                  {filteredCategories.map((item) => (
                    <li key={item.id} className="w-[10rem] flex justify-center">
                      <Link href={`/search/${item.id}`} className="text-neutral-700 underline-offset-4 hover:text-black hover:underline">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )
            )}
          </div>
        )}
      </nav>
    </div>
  );
}
