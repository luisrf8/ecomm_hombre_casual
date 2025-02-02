// import { products } from 'lib/ddbb.js';
import Link from 'next/link';
import { GridTileImage } from './tile';
// Define datos simulados

function ThreeItemGridItem({
  item,
  size,
  priority
}) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link className="relative block aspect-square h-full w-full" href={`/product/${item.id}`} product={item}>
        <GridTileImage
          src={`${process.env.BASE_URL}/storage/${item.images[0].path}`}
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name,
            amount: item.variants[0].price,
            // currencyCode: item.price
            currencyCode: "USD"
          }}
        />
      </Link>
    </div>
  );
}

export function ThreeItemGrid({itemProducts}) {
  const [firstProduct, secondProduct, thirdProduct] = itemProducts;

  return (
    <>
      <div className="mx-auto max-w-screen-2xl gap-4 px-3">
        <div className='flex gap-5 px-8 pb-6'>
        {/* <p className="text-lg font-semibold flex items-center">Productos</p>
        <button className='text-[#022368]'>Ver más</button> */}
        </div>
        <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 md:grid-cols-6 md:grid-rows-2">
          <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
          <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
          <ThreeItemGridItem size="half" item={thirdProduct} />
        </section>
      </div>
    </>
  );
}
