"use client"
// import Carousel from 'components/carousel';
import { store } from 'components/cart/store';
import Footer from 'components/layout/footer';
import { ProductDescription } from 'components/product/product-description';
import { products } from 'lib/ddbb.js';
import { notFound, usePathname } from 'next/navigation';
import { Suspense } from 'react';
import { Provider } from 'react-redux';

export const runtime = 'edge';

export default function ProductPage() {
  const router = usePathname()
  const segments = router.split('/');
  const handle = segments[segments.length - 1];
  const product = products.find((product) => product.handle === handle);

  if (!product) return notFound();

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.featuredImage.url,
    offers: {
      '@type': 'AggregateOffer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      highPrice: 100.0,
      lowPrice: 50.0
    }
  };

  return (
    <Provider store={store}>
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8  md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            {/* <Gallery
              images={product.images}
            /> */}
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <div className='mt-6 text-lg font-semibold'>
            <label>
              Otros Productos.
            </label>
            {/* <Carousel /> */}
          </div>
        </Suspense>
      </div>
      <Suspense>
        <Footer />
      </Suspense>
    </>
    </Provider>
  );
}