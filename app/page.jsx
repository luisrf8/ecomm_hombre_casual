import Carousel from 'components/carousel';
import { ThreeItemGrid } from 'components/grid/three-items';
import IndexCarousel from 'components/index-carousel';
import Footer from 'components/layout/footer';
import { products } from 'lib/ddbb';
import { Suspense } from 'react';
export const runtime = 'edge';

export const metadata = {
  description: 'High-performance ecommerce store built with Next.js, Vercel, and Shopify.',
  openGraph: {
    type: 'website'
  }
};
const carouselProducts = [
  {
    handle: 'product-1',
    image: '/images/imgcarousel.jpg',
  },
  {
    handle: 'product-2',
    image: '/images/imgcarousel.jpg',
  },
  {
    handle: 'product-3',
    image: '/images/imgcarousel.jpg',
  },
  {
    handle: 'product-4',
    image: '/images/imgcarousel.jpg',
  },
  {
    handle: 'product-5',
    image: '/images/imgcarousel.jpg',
  },
];

export default async function HomePage() {
  return (
    <>
        <IndexCarousel products={carouselProducts}/>
        <div className='hidden flex-none md:block'>
          <Carousel carouselProducts={products} title="Ofertas"/>
        </div>
        <ThreeItemGrid />
        <div className='hidden flex-none md:block'>
          <Carousel carouselProducts={products} title="Productos destacados"/>
        </div>
        <Suspense>
          <Suspense>
            <Footer />
          </Suspense>
        </Suspense>
    </>
  );
}
