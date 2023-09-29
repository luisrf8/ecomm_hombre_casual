import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

// Define datos simulados
const simulatedProducts = [
  {
    id: '1',
    title: 'Product 1',
    handle: 'product-1',
    featuredImage: {
      url: '/images/product1.jpg', // Ruta a la imagen simulada
    },
    priceRange: {
      maxVariantPrice: {
        amount: 19.99,
        currencyCode: 'USD',
      },
    },
  },
  {
    id: '2',
    title: 'Product 2',
    handle: 'product-2',
    featuredImage: {
      url: '/images/product2.jpg', // Ruta a la imagen simulada
    },
    priceRange: {
      maxVariantPrice: {
        amount: 24.99,
        currencyCode: 'USD',
      },
    },
  },
  {
    id: '3',
    title: 'Product 3',
    handle: 'product-3',
    featuredImage: {
      url: '/images/product3.jpg', // Ruta a la imagen simulada
    },
    priceRange: {
      maxVariantPrice: {
        amount: 14.99,
        currencyCode: 'USD',
      },
    },
  },
];

function ThreeItemGridItem({
  item,
  size,
  priority
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.handle}`}>
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.title,
            amount: item.priceRange.maxVariantPrice.amount,
            currencyCode: item.priceRange.maxVariantPrice.currencyCode
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid() {
  const [firstProduct, secondProduct, thirdProduct] = simulatedProducts;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
