'use client';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { usePathname } from 'next/navigation';

export function ProductDescription() {
  const navigation = usePathname();
  const { title, price, featuredImage, currencyCode } = navigation;
  console.log("Product", navigation)
  if (!title || !price || !currencyCode) {
    return <div>Cargando...</div>;
  }

  // Define la propiedad "descriptionHtml" si es necesario
  const product = {
    title,
    priceRange: {
      maxVariantPrice: {
        amount: parseFloat(price), // Convierte el precio a un número decimal
        currencyCode,
      },
    },
    featuredImage, // Asegúrate de que featuredImage se haya pasado correctamente
    descriptionHtml: '<p>Descripción del producto en formato HTML.</p>', // Define tu descripción aquí
    variants: [
      // Define las variantes aquí si es necesario
      {
        id: 'variant-1',
        title: 'Rojo - Pequeño',
        price: 29.99,
        availableForSale: true, // Define la disponibilidad aquí
      },
      {
        id: 'variant-2',
        title: 'Azul - Mediano',
        price: 29.99,
        availableForSale: true, // Define la disponibilidad aquí
      },
      // Agrega más variantes si es necesario
    ],
  };

  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
          <Price amount={product.priceRange.maxVariantPrice.amount} currencyCode={product.priceRange.maxVariantPrice.currencyCode} />
        </div>
      </div>

      {product.featuredImage && (
        <img src={product.featuredImage} alt={product.title} /> // Muestra la imagen destacada si está disponible
      )}

      {product.descriptionHtml ? (
        <Prose className="mb-6 text-sm leading-tight dark:text-white/[60%]" html={product.descriptionHtml} />
      ) : null}

      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
    </>
  );
}
