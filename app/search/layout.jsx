'use client'
import Footer from 'components/layout/footer';
import LoadingDots from 'components/loading-dots';
import api from 'lib/axios';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
// const collectionsData = [
//   {
//     id: 'collection1',
//     title: 'Colección 1',
//     items: [
//       { itemId: 'item1', itemName: 'Producto 1', path: '/product' },
//       { itemId: 'item2', itemName: 'Producto 2', path: '/product' },
//     ],
//   },
//   {
//     id: 'collection2',
//     title: 'Colección 2',
//     items: [
//       { itemId: 'item3', itemName: 'Producto 3', path: '/product' },
//       { itemId: 'item4', itemName: 'Producto 4', path: '/product' },
//     ],
//   },
// ];

export default function SearchLayout({ children }) {
  const [collectionsData, setCollectionsData] = useState([])
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const pathname = usePathname();

  useEffect(() => {
    // getParentCategories()
  }, [pathname])
  // const pathname = "/search/5"; // Puedes reemplazar esto con usePathname();
  function getParentCategories() {
    const match = pathname.match(/\/search\/([a-f\d-]+)/);
    const categoriaId = match ? match[1] : null;
    api.get(`/parent-categories/${categoriaId}/article-categories`)
    .then(response => {
        // La respuesta exitosa se almacena en el estado
        setCollectionsData(response.data)
        setHasFetchedData(true); 
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error);
        setHasFetchedData(true); 
      });
    }
// Opción 1: Utilizando expresiones regulares

// Opción 2: Dividiendo la cadena
const partes = pathname.split('/');
const categoriaId2 = partes[2];

  return (
    <Suspense>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 mt-6 pb-4 text-black  md:flex-row">
        {!hasFetchedData ? (
            <LoadingDots className="bg-gray-900" />
          ) : (
          // collectionsData ? (
            <div className="order-first w-full flex-none md:max-w-[125px] md:mt-10">
              {/* {collectionsData.map((collection) => (
                <Collections key={collection.id} id={collection.id} description={collection.description} />
              ))} */}
            </div>
          // ) : ("")
        )}
        <div className="order-last min-h-screen w-full md:order-none ">{children}</div>
      </div>
      <Footer />
    </Suspense>
  );
}
