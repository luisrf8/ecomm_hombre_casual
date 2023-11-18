import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function OpenCart({ quantity }) {
  return (
    <div className="flex items-center gap-1 transition-colors w-[5rem] md:w-[6.5rem]">
      <ShoppingCartIcon
        className={'h-7 transition-all ease-in-out hover:scale-110 text-blue-900'}
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