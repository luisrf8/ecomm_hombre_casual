'use client'
import Footer from 'components/layout/footer';
import Collections from 'components/layout/search/collections';
import { usePathname } from 'next/navigation';
import { Suspense } from 'react';

const collectionsData = [
  {
    id: 'collection1',
    title: 'Colección 1',
    items: [
      { itemId: 'item1', itemName: 'Producto 1', path: '/search/product' },
      { itemId: 'item2', itemName: 'Producto 2', path: '/search/product' },
    ],
  },
  {
    id: 'collection2',
    title: 'Colección 2',
    items: [
      { itemId: 'item3', itemName: 'Producto 3', path: '/search/product' },
      { itemId: 'item4', itemName: 'Producto 4', path: '/search/product' },
    ],
  },
];

export default function SearchLayout({ children }) {
  const pathname = usePathname();
  console.log("hola",pathname)
  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 mt-6 pb-4 text-black  md:flex-row">
        <div className="order-first w-full flex-none md:max-w-[125px]">
          {collectionsData.map((collection) => (
            <Collections key={collection.id} itemsCollections={collection.items} title={collection.title} />
          ))}
        </div>
        <div className="order-last min-h-screen w-full md:order-none ">{children}</div>
      </div>
      <Footer />
    </Suspense>
  );
}
