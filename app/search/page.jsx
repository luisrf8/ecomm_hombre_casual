import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';

export const runtime = 'edge';

export const metadata = {
  title: 'Search',
  description: 'Search for products in the store.'
};

export default function SearchPage({ searchParams }) {
  const { q: searchValue } = searchParams;

  // Simula la obtención de productos con un array de ejemplo
  const products = [
    { title: 'Product 1', /* Otros datos del producto */ },
    { title: 'Product 2', /* Otros datos del producto */ },
    // ... Puedes agregar más productos simulados aquí
  ];

  const resultsText = products.length > 1 ? 'results' : 'result';

  return (
    <>
      {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}
      {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
    </>
  );
}
