'use client'
import ProductGridItems from 'components/layout/product-grid-items';
import LoadingOverlay from 'components/loading-overlay';
import api from 'lib/axios';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';


export default function CategoryPage() {
  const [articles, setArticles] = useState([]);
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Define una función asíncrona dentro del useEffect
    const fetchArticles = async () => {
      // setIsLoading(true); // Activa el estado de carga
      try {
        const response = await api.get(`api/get-products`);
        setArticles(response.data);
      } catch (error) {
        console.error('Hubo un error al hacer la solicitud GET:', error);
      } finally {
        setHasFetchedData(true);
        // setIsLoading(false); // Desactiva el estado de carga
      }
    };

    // Evita llamadas innecesarias si ya se ha obtenido la información
    if (!hasFetchedData) {
      fetchArticles();
    }
  }, [pathname, hasFetchedData]);

  return (
    <section>
      <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 mt-6 pb-4 text-black md:flex-row">
        {!hasFetchedData ? (
          <LoadingOverlay />
          // <LoadingDots className="bg-gray-900" />
        ) : (
          ""
        )}
        <div className="order-last min-h-screen w-full md:order-none">
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