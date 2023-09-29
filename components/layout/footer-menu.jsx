"use client";
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const menuOptions = [
  { id: 'inicio', title: 'Inicio', path: '/' },
  // Add more menu options here
];

function FooterMenuItem({ item }) {
  const [isActive, setActive] = useState(false);

  useEffect(() => {
    // Check the pathname on the client side
    const pathname = window.location.pathname;
    setActive(pathname === item.path);
  }, [item.path]);

  return (
    <li>
      <Link href={item.path} passHref>
        <a
          className={clsx(
            'block p-2 text-lg underline-offset-4 hover:text-black hover:underline dark:hover:text-neutral-300 md:inline-block md:text-sm',
            {
              'text-black dark:text-neutral-300': isActive,
            }
          )}
        >
          {item.title}
        </a>
      </Link>
    </li>
  );
}

export default function FooterMenu() {
  return (
    <nav>
      <ul>
        {menuOptions.map((item) => (
          <FooterMenuItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
