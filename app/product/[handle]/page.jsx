import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { GridTileImage } from 'components/grid/tile';
import { Gallery } from 'components/product/gallery';
import { ProductDescription } from 'components/product/product-description';
import Link from 'next/link';
const sampleProduct = {
  title: "Producto de muestra",
  description: "Esta es una descripción de muestra para el producto.",
  featuredImage: {
    url: "https://ejemplo.com/imagen.jpg",
    width: 800,
    height: 600,
    altText: "Imagen de muestra"
  },
  images: [
    {
      url: "https://ejemplo.com/imagen1.jpg",
      altText: "Imagen 1 de muestra"
    },
    {
      url: "https://ejemplo.com/imagen2.jpg",
      altText: "Imagen 2 de muestra"
    }
  ],
  priceRange:{
    maxVariantPrice: {
      amount: "10 USD"
    }
  },
};

export const runtime = 'edge';

export async function generateMetadata() {
  const product = sampleProduct;

  if (!product) return notFound();

  const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = true;

  return {
    title: product.title,
    description: product.description,
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable
      }
    },
    openGraph: url
      ? {
          images: [
            {
              url,
              width,
              height,
              alt
            }
          ]
        }
      : null
  };
}

export default function ProductPage() {
  const product = sampleProduct;

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
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd)
        }}
      />
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="h-full w-full basis-full lg:basis-4/6">
            <Gallery
              images={product.images}
            />
          </div>

          <div className="basis-full lg:basis-2/6">
            <ProductDescription product={product} />
          </div>
        </div>
        <Suspense>
          <RelatedProducts />
        </Suspense>
      </div>
      <Suspense>
        {/* <Footer /> */}
      </Suspense>
    </>
  );
}

function RelatedProducts() {
  const relatedProducts = [
    {
      handle: "producto1",
      title: "Producto Relacionado 1",
      priceRange: {
        minVariantPrice: {
          currencyCode: "USD",
          amount: 75.0
        },
        maxVariantPrice: {
          currencyCode: "USD",
          amount: 90.0
        }
      },
      featuredImage: {
        url: "https://ejemplo.com/producto1.jpg",
        width: 800,
        height: 600,
        altText: "Imagen Producto Relacionado 1"
      }
    },
    // Agrega más productos relacionados simulados aquí
  ];

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Productos Relacionados</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.handle}
            className="aspect-square w-full flex-none min-[475px]:w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link className="relative h-full w-full" href={`/product/${product.handle}`} itemProduct={itemProduct}>
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage.url}
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
