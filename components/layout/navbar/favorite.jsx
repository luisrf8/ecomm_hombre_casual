import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useSelector } from "react-redux";

export default function Favorite() {
  const user = useSelector((state) => state.auth);
  console.log("user", user);

  // Validar si `user` existe y si tiene la propiedad `user`
  const isAuthenticated = user && user.user && user.user.name;

  return (
    <div className="flex cursor-pointer items-center justify-center transition-colors w-[10rem]">
      <UserIcon className="h-7 transition-all ease-in-out hover:scale-110 text-blue-900" />

      {isAuthenticated ? (
        <Link href="/user">
          <span className="">{user.user.name}</span>
        </Link>
      ) : (
        <Link href="/login">
          <span className="hover:underline">Iniciar Sesión</span>
        </Link>
      )}
    </div>
  );
}
