"use client";
import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import Favorite from './favorite';
// import Search from './search';

export default function MobileMenu({menu}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname, searchParams]);

  return (
    <>
      <button
        onClick={openMobileMenu}
        aria-label="Open mobile menu"
        className="flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 transition-colors text-center "
      >
        <Bars3Icon className="h-4" />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[-100%]"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-[-100%]"
          >
            <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full w-full flex-col bg-white pb-6 ">
              <div className="p-4">
                <button
                  className="mb-4 flex h-11 w-11 items-center justify-center rounded-md border border-neutral-200 text-black transition-colors "
                  onClick={closeMobileMenu}
                  aria-label="Close mobile menu"
                >
                  <XMarkIcon className="h-6" />
                </button>

                {/* <div className="mb-4 w-full">
                  <Search />
                </div> */}
                {menu ? (
                  <ul className="flex w-full flex-col">
                    {/* Agregar opción "Todos" */}
                    <li className="py-2 text-xl text-black transition-colors hover:text-neutral-500">
                      <Link
                        href="/search"
                        className="text-neutral-700 underline-offset-4 hover:text-black hover:underline"
                        onClick={closeMobileMenu}
                      >
                        Todos
                      </Link>
                    </li>
                    
                    {/* Renderizar los elementos del menú */}
                    {menu.map((item, index) => (
                      <li
                        className="py-2 text-xl text-black transition-colors hover:text-neutral-500"
                        key={index}
                      >
                        <Link
                          href={`/search/${item.id}`}
                          className="text-neutral-700 underline-offset-4 hover:text-black hover:underline"
                          onClick={closeMobileMenu}
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                    
                    <Favorite />
                  </ul>
                ) : null}

              </div>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
