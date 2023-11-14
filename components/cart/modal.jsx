'use client';
import { Dialog, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon, ShoppingCartIcon, TrashIcon } from '@heroicons/react/24/outline';
import LoadingDots from 'components/loading-dots';

import { DEFAULT_OPTION } from 'lib/constants';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState, useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Price from '../price';
import CloseCart from './close-cart';
import DeleteItemButton from './delete-item-button';
import OpenCart from './open-cart';
import { addToCart, removeAllCart, removeFromCart } from './reducers/cartReducer';


export default function CartModal() {
  const router = useRouter();
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const [isPending, startTransition] = useTransition();
  const openMobileMenu = () => setIsOpen(true);
  const closeMobileMenu = () => setIsOpen(false);
  const [isOpen, setIsOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  useEffect(() => {
    totalCardAmount()
  }, [cart])

  useEffect(() => {
  }, [totalAmount]);

  function totalCardAmount() {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      const amount = cart[i].quantity * cart[i].price
      total += amount      
    }
    setTotalAmount(total)
  }

  function handleRemoveFromCart() {
    dispatch(removeAllCart())
  }
  
  function handleRemoveItemCart(product) {
    dispatch(removeFromCart(product))
  }

  function handleAddToCart(product) {
    dispatch(addToCart(product))
  }

  return (
    <>
      <button aria-label="Open cart" onClick={openCart}>
        <OpenCart quantity={cart.length} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeMobileMenu} className="relative z-50">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-[30%] xs:translate-x-[100%]"
            enterTo="translate-x-"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-30"
            leaveTo="translate-x-[30%] xs:translate-x-[100%]"
          >
          <Dialog.Panel className="fixed bottom-0 left-0 right-0 top-0 flex h-full flex-col pb-6">
        <><div style={{ zIndex: 35, display: 'flex', transform: `translateX(-${0}%)`, transition: 'transform 0.52s ease-in-out'}} className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l border-neutral-200 bg-white/80 p-6 text-black backdrop-blur-xl md:w-[390px]" >
          <div className="flex items-center justify-between">
            <p className="text-lg font-semibold">Carrito</p>
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
                      className="flex w-full flex-col border-b border-neutral-300 "
                    >
                      <div className="relative flex w-full flex-row justify-between px-1 py-4">
                        <div className="absolute z-40 -mt-2 ml-[55px]">
                          <DeleteItemButton item={item} />
                        </div>
                          <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 ">
                            <Image
                              className="h-full w-full object-cover"
                              width={100}
                              height={100}
                              alt={item.featuredImage.url ||
                                item.title}
                              src={item.featuredImage.url} />
                          </div>
                          <div className="flex flex-1 flex-col text-base px-3">
                            <span className="leading-tight">
                              {item.title}
                            </span>
                            {item && item.item && item.item.title !== DEFAULT_OPTION ? (
                            <p className="text-sm text-neutral-500 ">
                              {item.item.title}
                            </p>
                          ) : null}
                          </div>
                        <div className="flex h-16 flex-col justify-between">
                          <Price
                            className="flex justify-end space-y-2 text-right text-sm"
                            amount={item.price}
                            />
                          <div className="ml-auto flex h-9 flex-row items-center rounded-full border border-neutral-200 ">
                            <button
                              onClick={() => handleRemoveItemCart(item)}
                              className=
                                'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80'
                            >
                                <MinusIcon className="h-4 w-4 " />
                            </button>
                              <p className="w-6 text-center">
                                <span className="w-full text-sm">{item.quantity}</span>
                              </p>
                            <button
                              onClick={() => handleAddToCart(item)}
                              className=
                                'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80'
                            >
                                <PlusIcon className="h-4 w-4 " />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              <div className="py-4 text-sm text-neutral-500 ">
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 ">
                  <p>Sub Total</p>
                  <Price
                    className="text-right text-base text-black "
                    amount={(totalAmount).toFixed(2)}
                  />
                </div>
                <div className="mb-3 flex items-center justify-between border-b border-neutral-200 pb-1 pt-1 ">
                  <p>Total</p>
                  <Price
                    className="text-right text-base text-black "
                    amount={ (totalAmount + totalAmount * 0.12).toFixed(2) }
                  />
                </div>
              </div>
              <button
                onClick={() => router.push('/form')}
                className="block w-full rounded-md bg-[#022368] p-3 text-center text-sm font-medium text-white  hover:opacity-90"
              >
                PAGAR
              </button>
            </div>
          )}
        </div></>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}