'use client'
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const fontStyle = {
  color: '#022368',
  fontWeight: 'bold',
  fontSize: '1.1rem'
}
const menuOptions = [
  {
    id: 'Nosotros',
    title: <span style={fontStyle}>Nosotros</span>,
    path: '/',
    submenus: [
      { id: 'opcion1', title: '¿Quienes Somos?', path: '/opcion1' },
      { id: 'opcion2', title: 'Mapa del Sitio', path: '/opcion2' },
      { id: 'opcion3', title: 'Nosotros', path: '/opcion3' },
    ],
  },
  {
    id: 'Ayuda',
    title: <span style={fontStyle}>Ayuda</span>,
    path: '/about',
    submenus: [
      { id: 'acerca-opcion1', title: 'Preguntas Frecuentes', path: '/about/opcion1' },
      { id: 'acerca-opcion2', title: 'Contacto', path: '/about/opcion2' },
      // Agregar más submenús según sea necesario
    ],
  },
  {
    id: 'Legal',
    title: <span style={fontStyle}>Legal</span>,
    path: '/services',
    submenus: [
      { id: 'acerca-opcion1', title: 'Términos y condiciones', path: '/about/opcion1' },
      { id: 'acerca-opcion1', title: 'Acuerdos de Privacidad', path: '/about/opcion1' },
      // Submenús para Servicios
    ],
  },
  {
    id: 'Aliados',
    title: <span style={fontStyle}>Aliados</span>,
    path: '/contact',
    submenus: [
      { id: 'acerca-opcion1', title: 'ZuliaGlass', path: '/about/opcion1' },
      { id: 'acerca-opcion1', title: 'BariGlass', path: '/about/opcion1' },
      { id: 'acerca-opcion1', title: 'LaraGlass', path: '/about/opcion1' },
      // Submenús para Contacto
    ],
  },
];

function FooterMenuItem({ item }) {
  const [isActive, setActive] = useState(false);
  const [showSubmenus, setShowSubmenus] = useState(true);

  useEffect(() => {
    // Check the pathname on the client side
    const pathname = window.location.pathname;
    setActive(pathname === item.path);
  }, [item.path]);

  const toggleSubmenus = () => {
    setShowSubmenus(!showSubmenus);
  };

  return (
    <li>
      <div
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline  md:inline-block md:text-sm',
          {
            'text-black': isActive,
          }
        )}
        onClick={toggleSubmenus}
      >
        {item.title}
      </div>
      {showSubmenus && item.submenus && (
        <ul>
          {item.submenus.map((submenuItem) => (
            <li key={submenuItem.id}>
              <Link href={submenuItem.path} passHref>
                <div className="p-2 md:text-sm hover:text-black">
                  {submenuItem.title}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function FooterMenu() {
  return (
    <nav>
      <ul className='md:flex md:gap-10'>
        {menuOptions.map((item) => (
          <FooterMenuItem key={item.id} item={item} />
        ))}
      </ul>
    </nav>
  );
}
