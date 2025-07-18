import { ShoppingCartIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

export default function OpenCart({ quantity }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex items-center gap-1 transition-colors w-[5rem] md:w-[6.5rem]">
      <ShoppingCartIcon
        className={'h-7 transition-all ease-in-out hover:scale-110 text-white-900'}
      />
      <span className='hidden flex-none md:block text-[14px]'>
        Carrito
      </span>
      {isClient && quantity ? (
        <div className="w-5 h-5 rounded-[50%] bg-gray-100 text-[13px] font-medium text-gray-900">
          {quantity}
        </div>
      ) : null}
    </div>
  );
}
