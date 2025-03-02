'use client'
import ProductGridItems from 'components/layout/product-grid-items';
import LoadingDots from 'components/loading-dots';
import api from 'lib/axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export const runtime = 'edge';
export default async function CategoryPage() {
  const [articles, setArticles] = useState([])
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const pathname = usePathname();
  useEffect(() => {
    const match = pathname.match(/\/search\/([a-f\d-]+)/);
    const categoriaId = match ? match[1] : null;
    // getParentCategories()
    getArticles(categoriaId)
}, [pathname])
  function getArticles(id) {
    api.get(`api/products/${id}`)
    .then(response => {
        setArticles(response.data)
        setHasFetchedData(true); 
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error);
        setHasFetchedData(true); 
      });
    }
  return (
    <section>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 mt-6 pb-4 text-black  md:flex-row">
        {!hasFetchedData ? (
            <LoadingDots className="bg-gray-900" />
          ) : 
          ("")
        }
        <div className="order-last min-h-screen w-full md:order-none ">
          {articles.length === 0 ? (
            <p className="text-lg">{`No hay productos en esta categoría.`}</p>
          ) : (
            <ProductGridItems products={articles} />
          )}
        </div>
      </div>
    </section>
  );
}
