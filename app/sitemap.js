const baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'http://localhost:3000';

export default async function sitemap() {
  const routesMap = [''].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  // Simulación de colecciones, productos y páginas (cambia esto según tus necesidades)
  const simulatedCollections = [
    { path: '/collection1', updatedAt: '2023-09-26T12:00:00Z' },
    { path: '/collection2', updatedAt: '2023-09-25T14:30:00Z' },
  ];

  const simulatedProducts = [
    { handle: 'product1', updatedAt: '2023-09-24T08:45:00Z' },
    { handle: 'product2', updatedAt: '2023-09-23T16:20:00Z' },
  ];

  const simulatedPages = [
    { handle: 'page1', updatedAt: '2023-09-22T09:10:00Z' },
    { handle: 'page2', updatedAt: '2023-09-21T11:55:00Z' },
  ];

  const collectionsRoutes = simulatedCollections.map((collection) => ({
    url: `${baseUrl}${collection.path}`,
    lastModified: collection.updatedAt,
  }));

  const productsRoutes = simulatedProducts.map((product) => ({
    url: `${baseUrl}/search/${product.handle}`,
    lastModified: product.updatedAt,
  }));

  const pagesRoutes = simulatedPages.map((page) => ({
    url: `${baseUrl}/${page.handle}`,
    lastModified: page.updatedAt,
  }));

  return [...routesMap, ...collectionsRoutes, ...productsRoutes, ...pagesRoutes];
}
