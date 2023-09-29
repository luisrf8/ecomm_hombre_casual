import Link from 'next/link';
import { GridTileImage } from './grid/tile';

export async function Carousel() {
  // Simula los productos del carrusel
  const simulatedProducts = [
    {
      handle: 'product-1',
      title: 'Producto 1',
      priceRange: {
        maxVariantPrice: {
          amount: 10.0,
          currencyCode: 'USD'
        }
      },
      featuredImage: {
        url: '/path-to-image-1.jpg' // URL de la imagen simulada
      }
    },
    {
      handle: 'product-2',
      title: 'Producto 2',
      priceRange: {
        maxVariantPrice: {
          amount: 15.0,
          currencyCode: 'USD'
        }
      },
      featuredImage: {
        url: '/path-to-image-2.jpg' // URL de la imagen simulada
      }
    },
    // Agrega más productos simulados aquí
  ];

  // Duplica los productos para crear un carrusel infinito
  const carouselProducts = [...simulatedProducts, ...simulatedProducts, ...simulatedProducts];

  return (
    <div className="w-full overflow-x-auto pb-6 pt-1">
      <ul className="flex animate-carousel gap-4">
        {carouselProducts.map((product, i) => (
          <li
            key={`${product.handle}${i}`}
            className="relative aspect-square h-[30vh] max-h-[275px] w-2/3 max-w-[475px] flex-none md:w-1/3"
          >
            <Link href={`/product/${product.handle}`} className="relative h-full w-full">
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange.maxVariantPrice.amount,
                  currencyCode: product.priceRange.maxVariantPrice.currencyCode
                }}
                src={product.featuredImage?.url}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
