'use client'
import Carousel from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
// import IndexCarousel from 'components/index-carousel';
import Footer from 'components/layout/footer';
import api from 'lib/axios';
import { useEffect, useState } from 'react';

export const runtime = 'edge';

const carouselProducts = [
  {
    handle: 'product-2',
    image: '/images/img1.png',
  },
  {
    handle: 'product-3',
    image: '/images/img2.png',
  },
];

export default function HomePage() {
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const [products, setProducts] = useState(null)
  useEffect(() => {
    getArticles()
}, [])
function getArticles() {
  api.get(`api/get-products`)
  .then(response => {
      setProducts(response.data)
      setHasFetchedData(true); 
    })
    .catch(error => {
      setHasFetchedData(true); 
    });
  }
  return (
    <>
        {/* <IndexCarousel products={carouselProducts}/> */}
        {products ? (
          <div>
            <ThreeItemGrid itemProducts={products} />
            <Carousel carouselProducts={products} title="Ofertas"/>
            <Carousel carouselProducts={products} title="Trending"/>
          </div>
        ) : ("") }
            <Footer />
    </>
  );
}
