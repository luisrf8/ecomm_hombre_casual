'use client'
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { FacebookIcon, InstagramIcon, TelegramIcon, WhatsAppIcon } from '../icons/svg/socialMedia';
const fontStyle = {
  color: 'white',
  fontWeight: 'bold',
  fontSize: '1.1rem',
};

const menuOptions = [
  {
    id: 'Nosotros',
    title: <span style={fontStyle}>Nosotros</span>,
    path: '/',
    submenus: [{ id: 'opcion2', title: 'Mapa del Sitio', path: '/opcion2' }],
  },
  {
    id: 'Ayuda',
    title: <span style={fontStyle}>Ayuda</span>,
    path: '/about',
    submenus: [{ id: 'acerca-opcion2', title: 'Contacto', path: '/about/opcion2' }],
  },
  {
    id: 'Legal',
    title: <span style={fontStyle}>Legal</span>,
    path: '/services',
    submenus: [{ id: 'acerca-opcion3', title: 'Términos y condiciones', path: '/about/opcion1' }],
  },
];

function FooterMenuItem({ item }) {
  const [isActive, setActive] = useState(false);
  const [showSubmenus, setShowSubmenus] = useState(true);

  useEffect(() => {
    const pathname = window.location.pathname;
    setActive(pathname === item.path);
  }, [item.path]);

  const toggleSubmenus = () => setShowSubmenus(!showSubmenus);

  return (
    <li>
      <div
        className={clsx(
          'block p-2 text-lg underline-offset-4 hover:text-black hover:underline md:inline-block md:text-sm',
          { 'text-black': isActive }
        )}
        onClick={toggleSubmenus}
      >
        {item.title}
      </div>
      {showSubmenus && item.submenus && (
        <ul>
          {item.submenus.map((submenuItem) => (
            <li key={submenuItem.id}>
              <Link href={submenuItem.path}>
                <div className="p-2 md:text-sm hover:text-black">{submenuItem.title}</div>
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
    <div className="flex flex-col md:flex-row md:items-start md:justify-between w-full gap-5 mt-4">
      {/* Menú */}
      <nav>
        <ul className="md:flex md:gap-10">
          {menuOptions.map((item) => (
            <FooterMenuItem key={item.id} item={item} />
          ))}
        </ul>
      </nav>

      {/* Redes sociales */}
      <div className="flex gap-8 text-[#022368] mt-4 md:mt-10">
        <a href="https://www.instagram.com/infinitycenter.ca/" target="_blank" rel="noopener noreferrer" className='text-[10px]'>
          <InstagramIcon  className="w-10 h-10" />
        </a>
        <a href="https://api.whatsapp.com/send?phone=584122628765" target="_blank" rel="noopener noreferrer">
          <WhatsAppIcon  className="w-10 h-10" />
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ color: '#022368', fontSize: '0.5rem' }}>
          <FacebookIcon  className="w-10 h-10" />
        </a>
        <a href="https://t.me" target="_blank" rel="noopener noreferrer">
          <TelegramIcon  className="w-10 h-10" />
        </a>
      </div>
    </div>
  );
}
