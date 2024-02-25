/* eslint-disable @next/next/no-async-client-component */
'use client'
import ProductGridItems from 'components/layout/product-grid-items';
// import Collections from 'components/layout/search/collections';
import LoadingDots from 'components/loading-dots';
import api from 'lib/axios';
import { products } from 'lib/ddbb.js';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
export const runtime = 'edge';
export default async function CategoryPage() {
  const [articles, setArticles] = useState([])
  const [collectionsData, setCollectionsData] = useState([])
  // const searchParams = useSearchParams();
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const pathname = usePathname();
  useEffect(() => {
    const match = pathname.match(/\/search\/([a-f\d-]+)/);
    const categoriaId = match ? match[1] : null;
    getParentCategories()
    getArticles(categoriaId)
}, [pathname])
  function getArticles(id) {
    api.get(`/article-categories/${id}/articles`)
    .then(response => {
      // console.log("articlesdsadas", response.data.data)
        setArticles(response.data.data)
        // const enabledItems = response.data.filter(item => item.enabled === true);
        setHasFetchedData(true); 
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error);
        setHasFetchedData(true); 
      });
    }
    function getParentCategories() {
      // const match = pathname.match(/\/search\/(\d+)/);
      const match = pathname.match(/\/search\/([a-f\d-]+)/);
      const categoriaId = match ? match[1] : null;
      api.get(`/parent-categories/${categoriaId}/article-categories`)
      .then(response => {
          // La respuesta exitosa se almacena en el estado
          setCollectionsData(response.data)
          getArticles(response.data.data[0]._id)
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
          // (
          // collectionsData ? (
          //   <div className="order-first w-full flex-none md:max-w-[125px]">
          //     {collectionsData.map((collection) => (
          //       // <Collections key={collection.id} id={collection.id} description={collection.description} />
          //       <div className='text-blue-900 font-semibold cursor-pointer' key={collection.id}
          //       onClick={() => getArticles(collection.id)}>
          //         {collection.description}
          //       </div>
          //     ))}
          //   </div>
          // )
          // : 
          ("")
        // )
        }
        <div className="order-last min-h-screen w-full md:order-none ">
          {products.length === 0 ? (
            <p className="text-lg">{`No products found in this collection`}</p>
          ) : (
            // <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <ProductGridItems products={articles} />
          // </Grid>
          )}
        </div>
      </div>
    </section>
  );
}
