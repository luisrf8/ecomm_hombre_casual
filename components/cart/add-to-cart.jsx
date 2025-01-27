import clsx from 'clsx';
import { useEffect, useState, useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from './reducers/cartReducer';

export function AddToCart(data) {
  const dispatch = useDispatch();
  const [isAble, setIsAble] = useState(false);
  console.log("data", data)
  const { newItem, item } = data;
  const { variants } = item;
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setIsAble(!!newItem);
  }, [newItem]);

  const defaultVariantId = variants?.length === 1 ? variants[0]?.id : undefined;

  const variant = variants?.find((element) =>
    Object.entries(newItem).every(([key, value]) => element[key] === value)
  );

  const selectedVariantId = variant?.id || defaultVariantId;

  const handleAddToCart = async (product) => {
    dispatch(addToCart(product));
  };

  const title = !newItem ? 'Por favor selecciona opciones' : undefined;

  return (
    <button
      aria-label="Añadir al carrito"
      title={title}
      disabled={!isAble || isPending}
      onClick={() => {
        if (!newItem) return;
        startTransition(async () => {
          const product = {
            ...newItem,
            variantId: selectedVariantId,
            quantity: 1,
          };

          const error = await handleAddToCart(product);

          if (error) {
            throw new Error(error.toString());
          }
        });
      }}
      className={clsx(
        'relative flex w-[15rem] items-center justify-center rounded-md bg-[#022368] p-4 tracking-wide text-white hover:opacity-90',
        {
          'cursor-not-allowed opacity-60': !isAble || isPending,
        }
      )}
    >
      <span>{!selectedVariantId ? 'Selecciona opciones' : '+ Añadir al carrito'}</span>
    </button>
  );
}
