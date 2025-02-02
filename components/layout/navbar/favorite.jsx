import { UserIcon } from '@heroicons/react/24/outline';
import Link from "next/link";

export default function Favorite({ user }) {
  return (
    <div className="flex cursor-pointer items-center justify-center transition-colors w-[10rem]">
      <UserIcon className="h-7 transition-all ease-in-out hover:scale-110 text-blue-900" />

      {user ? (
        <Link href="/user">
          <span className="">{user.name}</span>
        </Link>
      ) : (
        <Link href="/login">
          <span className=" hover:underline">Iniciar Sesión</span>
        </Link>
      )}
    </div>
  );
}
