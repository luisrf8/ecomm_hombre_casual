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
    handle: 'product-2',
    image: '/images/Banner-1.jpg',
  },
  {
    handle: 'product-3',
    image: '/images/Banner-2.jpg',
  },
];

export default async function HomePage() {
  return (
    <>
        <IndexCarousel products={carouselProducts}/>
          <Carousel carouselProducts={products} title="Ofertas"/>
        <ThreeItemGrid />
          <Carousel carouselProducts={products} title="Trending"/>
        <Suspense>
          <Suspense>
            <Footer />
          </Suspense>
        </Suspense>
    </>
  );
}
