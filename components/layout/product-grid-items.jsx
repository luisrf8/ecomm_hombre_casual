import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

export default function ProductGridItems({ products }) {
  // Simula los datos del producto
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

  // Utiliza los productos simulados si no se proporcionan productos reales
  const productsToRender = simulatedProducts;

  return (
    <>
      {productsToRender.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                // amount: product.priceRange.maxVariantPrice.amount,
                // currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              available={product.availableForSale}
              fill
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
