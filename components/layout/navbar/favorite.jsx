import { HeartIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function Favorite() {
  return (
    <div className={clsx("flex cursor-pointer items-center justify-center transition-colors w-[6.5rem]")}>
      <HeartIcon
        className={clsx('h-7 transition-all ease-in-out hover:scale-110 text-blue-900')}
      />
      <span className='text-[14px]'>
        Favoritos
      </span>
    </div>
  );
}