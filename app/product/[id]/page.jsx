"use client"
import { Gallery } from 'components/product/gallery';
// import Carousel from 'components/carousel';
import { store } from 'components/cart/store';
import Footer from 'components/layout/footer';
import { ProductDescription } from 'components/product/product-description';
// import { Questions } from 'components/product/questions';
import api from 'lib/axios';
import { usePathname } from 'next/navigation';
import { Suspense, useEffect, useState } from 'react';
import { Provider } from 'react-redux';
export const runtime = 'edge';

export default function ProductPage() {
  const pathname = usePathname()
  const [hasFetchedData, setHasFetchedData] = useState(false)
  const [product, setProduct] = useState(null)
  // const segments = router.split('/');
  // const handle = segments[segments.length - 1];
  // const product = products.find((product) => product.handle === handle);
  useEffect(() => {
    // const match = pathname.match(/\/search\/(\d+)/);
    // const categoriaId = match ? match[1] : null;
    // getArticles(categoriaId)
      // const match = pathname.match(/\/product\/(\d+)/);
      const match = pathname.match(/\/product\/([a-f\d-]+)/);
      
      const categoriaId = match ? match[1] : null;
      getArticles(categoriaId)
}, [pathname])
function getArticles(id) {
  api.get(`api/getProduct/${id}`)
  .then(response => {
      setProduct(response.data)
      console.log("response.data", response.data)
      setHasFetchedData(true); 
    })
    .catch(error => {
      console.error('Hubo un error al hacer la solicitud GET:', error);
      setHasFetchedData(true); 
    });
  }
  
  // if (!product) return notFound();
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    // name: product.name,
    // description: product.description,
    // image: product.featuredImage.url,
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
      {product ? (
      <div className="mx-auto max-w-screen-2xl px-4 py-6">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-gray-100  lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-3/6 bg-white">
            <Gallery
              images={product.images ? product.images[0] : ""}
              className="p-8 md:p-12"
            />
          </div>

          <div className="basis-full md:basis-3/6 md:p-10 xs:p-8">
            <ProductDescription product={product} />
          </div>
        </div>
        {/* <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8 mt-4">
          <Questions/>
        </div> */}
      </div>
      ) : ("") }
      {/* <div className='mt-[0rem]'>
        <Carousel carouselProducts={products} title="Otros Productos."/>
      </div> */}
      <Suspense>
        <Footer />
      </Suspense>
    </>
    </Provider>
  );
}