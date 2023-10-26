'use client'
import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

export default function OpenCart({ quantity }) {
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
  return (
    <div className="flex items-center gap-1 transition-colors  w-[5rem] md:w-[6.5rem]">
      <ShoppingCartIcon
        className={clsx('h-7 transition-all ease-in-out hover:scale-110 text-blue-900')}
      />
      <span className='hidden flex-none md:block text-[14px]'>
        Carrito
      </span>
      {quantity ? (
        <div className="w-5 h-5 rounded-[50%] bg-orange-400 text-[13px] font-medium text-white">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}