
import { UserIcon } from "@heroicons/react/24/outline";
import { logout } from "lib/slices/auth";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Favorite() {
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isAuthenticated = user && user.user && user.user.name;

  // Cerrar el menú si se hace clic fuera de él
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center cursor-pointer">
      <div
        className="flex items-center space-x-2 transition-colors w-[10rem]"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <UserIcon className="h-7 transition-all ease-in-out hover:scale-110 text-white-900" />
        {isAuthenticated ? (
          <span className="">{user.user.name}</span>
        ) : (
          <Link href="/login">
            <span className="hover:underline">Iniciar Sesión</span>
          </Link>
        )}
      </div>

      {/* Menú desplegable */}
      {menuOpen && isAuthenticated && (
        <div
          ref={menuRef}
          className="absolute top-4 right-0 mt-5 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        >
          <ul className="py-2">
            <li>
              <Link href="/user/purchases" className="block px-4 py-2 hover:bg-gray-100">
                Mis Compras
              </Link>
            </li>
            <li>
              <Link href="/user/edit" className="block px-4 py-2 hover:bg-gray-100">
                Editar Perfil
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  dispatch(logout());
                  setMenuOpen(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Cerrar Sesión
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
