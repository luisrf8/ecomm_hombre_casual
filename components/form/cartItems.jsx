"use client"
import Price from 'components/price';
import { DEFAULT_OPTION } from 'lib/constants';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CartItems() {
const cart = useSelector(state => state.cart)
const [totalAmount, setTotalAmount] = useState(0);

useEffect(() => {
  totalCardAmount()
}, [cart])
useEffect(() => {
}, [totalAmount]);
useEffect(() => {
})
function totalCardAmount() {
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    const amount = cart[i].quantity * cart[i].price
    total += amount      
  }
  setTotalAmount(total)
}
return(
    <div className='column'>
      <h2 className="text-base font-semibold leading-7 text-[#022368]">Carrito</h2>
      <ul className="flex-grow overflow-auto py-2"
        style={{height: '32rem',}}
      >
        {cart.map((item,i ) => {
          return (
            <li
              key={i}
              className="flex w-full flex-col "
            >
              <div className="relative flex w-full flex-row justify-between px-1 py-4">
                <div className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border border-neutral-300 bg-neutral-300 ">
                  <Image
                  className="h-full w-full object-cover"
                  width={150}
                  height={150}
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
                  <span className="leading-tight text-sm text-neutral-500 ">
                    Cantidad: {item.quantity}
                  </span>
                </div>
                <div className="flex h-16 flex-col justify-between">
                  <Price
                    className="flex justify-end text-right text-sm"
                    amount={item.price}
                  />
                </div>
              </div>
            </li> 
          )
        })}
      </ul>
      <div className="mt-3 flex items-center justify-between"
      >
        <p>Sub Total</p>
          <Price
          className="text-right text-base text-black"
          amount={(totalAmount).toFixed(2)}
          />
      </div>
      <div className="mb-3 flex items-center justify-between pt-1">
        <p>Impuesto</p>
          <Price
          className="text-right text-base text-black "
          amount={(totalAmount * 0.12).toFixed(2)}
          />
      </div>
      <div className="mb-3 flex items-center justify-between pt-1">
        <p>Total</p>
          <Price
          className="text-right text-base text-black "
          amount={(totalAmount + totalAmount * 0.12).toFixed(2)}
          />
      </div>
    </div>
  )
}