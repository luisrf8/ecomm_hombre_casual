'use client';
import { ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';
import { DEFAULT_OPTION } from 'lib/constants';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Price from '../price';
import CloseCart from './close-cart';
import DeleteItemButton from './delete-item-button';
import EditItemQuantityButton from './edit-item-quantity-button';
import OpenCart from './open-cart';
import { removeAllCart } from './reducers/cartReducer';


export default function CartModal() {
  const router = useRouter();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();

  const [isOpen, setIsOpen] = useState(false);
  const quantityRef = useRef(cart?.totalQuantity);
  
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    openCart();
    console.log("Luis lenght",cart)
  }, [cart])

  function handleRemoveFromCart() {
    dispatch(removeAllCart())
  }

  // useEffect(() => {
  //   // Open cart modal when quantity changes.
  //   if (cart?.totalQuantity !== quantityRef.current) {
  //     // But only if it's not already open (quantity also changes when editing items in cart).
  //     if (!isOpen) {
  //       setIsOpen(true);
  //     }

  //     // Always update the quantity reference
  //     quantityRef.current = cart?.totalQuantity;
  //   }
  // }, [isOpen, cart?.totalQuantity, quantityRef]);

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart.length} />
      </button>
      
      {isOpen && (
        <><div style={{ zIndex: 1}} className="fixed inset-0 bg-black/30" aria-hidden="true" /><div style={{ zIndex: 1,}} className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl dark:border-neutral-700 dark:bg-black/80 dark:text-white md:w-[390px]" >
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">My Cart</p>
            <button aria-label="Close cart" onClick={closeCart}>
              <CloseCart />
            </button>
          </div>
          {!cart || cart.length === 0 ? (
            <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
              <ShoppingCartIcon className="h-16" />
              <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
            </div>
          ) : (
            <div className="flex h-full flex-col justify-between overflow-hidden">
              <div className="flex justify-start items-center cursor-pointer" style={{border:"0.5px solid #404040", width:"fit-content", borderRadius:"5px"}}
              onClick={()=> {
                startTransition(async () => {
                  const simulatedRemoveItem = async () => {
                    return new Promise((resolve) => {
                      setTimeout(() => {
                        handleRemoveFromCart()
                        resolve(null);
                      }, 1000); 
                    });
                  };
                  const error = await simulatedRemoveItem();
                  if (error) {
                    throw new Error(error.toString());
                  }
                });
              }}>
                
                <button className='flex items-center'>
                  {isPending ? (
                    <LoadingDots className="bg-white m-1" />
                    ) : (
                    <TrashIcon
                      className='h-4 transition-all ease-in-out hover:scale-110 mx-1 my-1'
                    />
                  )}
                </button>
                <span className='mx-1' style={{fontSize:"12px"}}>
                Remover todos los items
                </span>
              </div>
              <ul className="flex-grow overflow-auto py-2">
                {cart.map((item, i) => {
                  return (
                    
                    <li
                      key={i}
                      className="flex w-full flex-col border-b border-neutral-300 dark:border-neutral-700"
                    >
                      <div className="relative flex w-full flex-row justify-between px-1 py-4">
                        <div className="absolute z-40 -mt-2 ml-[55px]">
                          <DeleteItemButton item={item} />
                        </div>
                        {/* <Link
                          onClick={closeCart}
                          className="z-30 flex flex-row space-x-4"
                        > */}
                          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 dark:border-neutral-700 dark:bg-neutral-900 dark:hover:bg-neutral-800">
                            {/* <Image
                              className="h-full w-full object-cover"
                              width={64}
                              height={64}
                              alt={item.featuredImage.url ||
                                item.title}
                              src={item.featuredImage.url} /> */}
                          </div>
                          <div className="flex flex-1 flex-col text-base px-3">
                            <span className="leading-tight">
                              {item.title}
                            </span>
                            {item && item.item && item.item.title !== DEFAULT_OPTION ? (
                            <p className="text-sm text-neutral-500 dark:text-neutral-400">
                              {item.item.title}
                            </p>
                          ) : null}
                          </div>
                        {/* </Link> */}
                        <div className="flex h-16 flex-col justify-between">
                          <Price
                            className="flex justify-end space-y-2 text-right text-sm"
                            amount={item.price}
                            />
                          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 dark:border-neutral-700">
                            <EditItemQuantityButton item={item} type="minus" />
                            <p className="w-6 text-center">
                              <span className="w-full text-sm">{item.quantity}</span>
                            </p>
                            <EditItemQuantityButton item={item} type="plus" />
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="py-4 text-sm text-neutral-500 dark:text-neutral-400">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 dark:border-neutral-700">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black dark:text-white"
                    amount={100}
                  />
                </div>
              </div>
              <button
                onClick={() => router.push('/form')}
                className="block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white opacity-90 hover:opacity-100"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div></>
      )}
    </>
  );
}