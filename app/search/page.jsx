'use client'
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { products } from 'lib/ddbb.js';
import { usePathname, useSearchParams } from 'next/navigation';

export const runtime = 'edge';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log("hola",pathname)
  console.log("como estas", searchParams)
  return (
    <>
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
