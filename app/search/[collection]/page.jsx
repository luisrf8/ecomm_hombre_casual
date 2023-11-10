import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { products } from 'lib/ddbb.js';
export const runtime = 'edge';

export default async function CategoryPage() {
  return (
    <section>
      {products.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <ProductGridItems products={products} />
      </Grid>
      )}
    </section>
  );
}
