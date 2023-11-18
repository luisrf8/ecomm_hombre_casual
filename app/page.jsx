'use client'
import Carousel from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import IndexCarousel from 'components/index-carousel';
import Footer from 'components/layout/footer';
// import { products } from 'lib/ddbb';
import { Suspense, useEffect, useState } from 'react';
export const runtime = 'edge';

const carouselProducts = [
  {
    handle: 'product-2',
    image: '/images/Banner-1.jpg',
  },
  {
    handle: 'product-3',
    image: '/images/Banner-2.jpg',
  },
];

export default async function HomePage() {
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const [products, setProducts] = useState(null); 

  useEffect(() => {
    if (!hasFetchedData) {
      getProducts()
    }
  }, [products]);
  function getProducts() {
    api.get("/articles")
    .then(response => {
        setProducts(response.data)
        console.log("peticion2", products);
        setHasFetchedData(true); 
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error);
      });
    }
  return (
    <>
        <IndexCarousel products={carouselProducts}/>
          <Carousel carouselProducts={products} title="Ofertas"/>
        <ThreeItemGrid useProducts={products}/>
          <Carousel carouselProducts={products} title="Trending"/>
        <Suspense>
          <Suspense>
            <Footer />
          </Suspense>
        </Suspense>
    </>
  );
}
