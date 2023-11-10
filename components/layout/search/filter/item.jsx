"use client";
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function PathFilterItem({ item }) {
  const pathname = usePathname();
  const active = pathname === item.path;

  return (
    <li className="mt-2 flex text-black " key={item.title}>
      <Link
        href={`/search/${item.path}`}
        className={clsx(
          'w-full text-sm underline-offset-4 hover:underline ',
          {
            'underline underline-offset-4': active
          }
        )}
      >
        {item.itemName}
      </Link>
    </li>
  );
}

export function FilterItem({ item }) {
  return <PathFilterItem item={item} /> ;
}
