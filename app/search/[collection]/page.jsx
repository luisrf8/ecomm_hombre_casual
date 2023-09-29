import { defaultSort, sorting } from 'lib/constants';
import { notFound } from 'next/navigation';

export const runtime = 'edge';

async function generateMetadata({ params }) {
  const { collection } = params;
  // Simula la obtención de datos de la colección, pero en este caso, simplemente establece un título simulado.
  const simulatedCollection = {
    title: `Simulated Collection: ${collection}`,
    seo: {
      title: `Simulated Collection Title: ${collection}`,
      description: `Simulated Description for Collection: ${collection}`
    }
  };

  // Simula la obtención de datos de la colección y devuelve notFound() si no se encuentra.
  if (!simulatedCollection) return notFound();

  return {
    title: simulatedCollection.seo?.title || simulatedCollection.title,
    description:
      simulatedCollection.seo?.description ||
      simulatedCollection.description ||
      `${simulatedCollection.title} products`
  };
}

export default async function CategoryPage({ params, searchParams }) {
  const { sort } = searchParams;
  const { sortKey, reverse } =
    sorting.find((item) => item.slug === sort) || defaultSort;

  // Simula la obtención de productos de la colección, pero en este caso, simplemente muestra un mensaje simulado.
  const simulatedProducts = [];

  return (
    <section>
      {simulatedProducts.length === 0 ? (
        <p className="py-3 text-lg">{`No products found in this collection`}</p>
      ) : (
        /* Renderiza los productos simulados aquí */
        null
      )}
    </section>
  );
}
