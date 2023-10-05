import { PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
import { useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, } from './reducers/cartReducer';
export function AddToCart(data) {
  const dispatch = useDispatch();
  const {newItem} = data
  const [isPending, startTransition] = useTransition();
  // const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  // const variant = variants.find((variant) =>
  //   variant.selectedOptions.every(
  //     (option) => option.value === searchParams.get(option.name.toLowerCase())
  //   )
  // );
  // const selectedVariantId = variant?.id || defaultVariantId;
  
  function handleAddToCart(product) {
    dispatch(addToCart(product))
  }
  const title = !newItem
    ? 'Please select options'
    : undefined;

  return (
    <button
      aria-label="Add item to cart"
      // disabled={!newItem}
      title={title}
      onClick={() => {
        // Salvaguarda en caso de que alguien manipule `disabled` en las devtools.
        if (!newItem) return;

        startTransition(async () => {
          const error = await handleAddToCart(newItem);

          if (error) {
            // Activa el límite de error en el archivo de error raíz (error.js)
            throw new Error(error.toString());
          }

        });
      }}
      className={clsx(
        'relative flex w-full items-center justify-center rounded-full bg-blue-600 p-4 tracking-wide text-white hover:opacity-90',
        {
          // 'cursor-not-allowed opacity-60 hover:opacity-60': !newItem.value,
          'cursor-not-allowed': isPending
        }
      )}
    >
      <div className="absolute left-0 ml-4">
        {!isPending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
      </div>
      <span>{newItem ? 'Add To Cart' : 'Please select options'}</span>
    </button>
  );
}
