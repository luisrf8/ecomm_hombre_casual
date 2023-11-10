import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

export default function ProductGridItems({ products }) {
  // Utiliza los productos simulados si no se proporcionan productos reales
  const productsToRender = products;

  return (
    <>
      {productsToRender.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              label={{
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              available={product.availableForSale}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
