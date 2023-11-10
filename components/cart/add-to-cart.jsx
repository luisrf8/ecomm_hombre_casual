import clsx from 'clsx';
import { useEffect, useState, useTransition } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, } from './reducers/cartReducer';
export function AddToCart(data) {
  const dispatch = useDispatch();
  const [isAble, setIsAble] = useState(false)

  const { newItem, item } = data
  const { variants } = item
  // console.log("luis data product item", { item: { img: item.featuredImage, handle: item.handle, variants: item.variants[0], id: item.id, quantity: 1, }});
  const [isPending, startTransition] = useTransition();
  useEffect(() => {
    setIsAble(true)
    console.log("dsadsa", isAble)
  }, [newItem]);
  const defaultVariantId = variants.length === 1 ? variants[0]?.id : undefined;
  
  const variant = variants.find((element) =>
  element.selectedOptions.every(
    (option) => option === newItem.item
    )
  );
    
  // console.log("luis data product new item", newItem)
  // console.log("luis data variant selected", variants);
  const selectedVariantId = variant?.id || defaultVariantId;
  // console.log("luis selectedVariantId", selectedVariantId);
  
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
      disabled={isAble === false}
      onClick={() => {
        // Salvaguarda en caso de que alguien manipule `disabled` en las devtools.
        if (!newItem) return;
        // if (!availableForSale || !selectedVariantId) return;
        startTransition(async () => {
          const error = await handleAddToCart(newItem);

          if (error) {
            // Activa el límite de error en el archivo de error raíz (error.js)
            throw new Error(error.toString());
          }

        });
      }} 
      className={clsx(
        'relative flex w-[15rem] items-center justify-center rounded-md bg-[#022368] p-4 tracking-wide text-white hover:opacity-90',
        {
          // 'cursor-not-allowed opacity-60 hover:opacity-60': !newItem.value,
          'cursor-not-allowed': isPending
        }
      )}
    >
      {/* <div className="absolute left-0 ml-4">
        {!isPending ? <PlusIcon className="h-5" /> : <LoadingDots className="mb-3 bg-white" />}
      </div> */}
      <span>{isAble !== false ? 'Añadir al carrito' : 'Please select options'}</span>
    </button>
  );
}
