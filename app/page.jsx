'use client'
import Carousel from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import IndexCarousel from 'components/index-carousel';
import Footer from 'components/layout/footer';
import api from 'lib/axios';
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
  const [products, setProducts] = useState(null)
  useEffect(() => {
    getArticles()
}, [])
function getArticles() {
  api.get(`/articles`)
  .then(response => {
      setProducts(response.data)
      console.log("hola product", response.data)
      setHasFetchedData(true); 
    })
    .catch(error => {
      console.error('Hubo un error al hacer la solicitud GET:', error);
      setHasFetchedData(true); 
    });
  }
  return (
    <>
        <IndexCarousel products={carouselProducts}/>
        {products ? (
          <div>
            <Carousel carouselProducts={products} title="Ofertas"/>
            <ThreeItemGrid itemProducts={products} />
            <Carousel carouselProducts={products} title="Trending"/>
          </div>
        ) : ("") }
        <Suspense>
          <Suspense>
            <Footer />
          </Suspense>
        </Suspense>
    </>
  );
}
