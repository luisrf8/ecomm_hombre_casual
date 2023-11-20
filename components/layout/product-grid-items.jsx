import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Link from 'next/link';

export default function ProductGridItems({ products }) {
  // Utiliza los productos simulados si no se proporcionan productos reales
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${product.id}`}>
            <GridTileImage
              alt={product.name}
              label={{
                // title: product.title,
                title: product.name,
                // amount: product.priceRange.maxVariantPrice.amount,
                amount: product.price,
                // currencyCode: product.priceRange.maxVariantPrice.currencyCode
                currencyCode: "BS"
              }}
              src={product.featuredImage?.url}
              // available={product.availableForSale}
              available={product.enabled}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  );
}
