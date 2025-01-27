import { UserIcon } from '@heroicons/react/24/outline';
import Link from "next/link";
// import clsx from 'clsx';

export default function Favorite() {
  return (
    <div className="flex cursor-pointer items-center justify-center transition-colors w-[10rem]">
      <UserIcon
        className='h-7 transition-all ease-in-out hover:scale-110 text-blue-900'
      />
      <Link href="/login">
        {/* <span className="text-blue-600 hover:underline"> Regístrate aquí</span> */}
        Iniciar Sesión
      </Link>
      {/* <span className='text-[14px]'>
      </span> */}
    </div>
  );
}