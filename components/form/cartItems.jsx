"use client"
import clsx from 'clsx';
import Price from 'components/price';
import api from 'lib/axios';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function CartItems() {
const cart = useSelector(state => state.cart)
const [totalAmount, setTotalAmount] = useState(0);
const [dollarRate, setDollarRate] = useState(0);

useEffect(() => {
  getDollarRate()
}, [])

useEffect(() => {
  totalCardAmount()
  getDollarRate()
}, [cart])

function totalCardAmount() {
  let total = 0
  for (let i = 0; i < cart.length; i++) {
    const amount = cart[i].quantity * cart[i].price
    total += amount      
  }
  setTotalAmount(total)
}
function getDollarRate() {
  api.get(`api/dollarRate`)
  .then(response => {
    console.log("response.data", Number(response.data.data.rate))
      setDollarRate(response.data.data.rate)
    })
    .catch(error => {
    });
  }
return(
    <div className='column'>
      { cart.length ? (
      <> 
      <h2 className="text-base font-semibold leading-7 text-black">Carrito</h2>
      <ul className="flex-grow overflow-auto py-2"
        style={{height: '100%',}}
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
                  alt='hc'
                  width={150}
                  height={150}
                  src={`${process.env.BASE_URL}/storage/${item.images[0].path}`}
                  />
                </div>
                <div className="flex flex-1 flex-col text-base px-3">
                  <span className="leading-tight">
                    {item.title}
                  </span>
                  <span className="leading-tight text-sm text-neutral-500 ">Talla:{item.item.size}</span>
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
      <div className="mb-3 flex items-center justify-between pt-1">
        <p>Total</p>
          <Price
          className="text-right text-base text-black "
          amount={(totalAmount).toFixed(2)}
          />
      </div>
      <div className="mb-3 flex items-center justify-between pt-1">
        <p>Tasa BS / USD</p>
        <p suppressHydrationWarning={true} className='p-1 rounded-md gap-2 border border-gray-200 text-gray-800'>
          <span className="ml-1 inline">{`${(1 * dollarRate).toFixed(2)}`} BS</span>
        </p>
      </div>
      <div className="mb-3 flex items-center justify-between pt-1">
        <p>Total Bolívares</p>
        <p suppressHydrationWarning={true}  className='p-1 rounded-md gap-2 border border-gray-200 text-gray-800'>
          <span className={clsx('ml-1 inline')}>{`${(totalAmount * dollarRate).toFixed(2)}`}</span>
          <span className={clsx('ml-1 inline')}>{`BS`}</span>
        </p>
      </div>
      </>
      )
      : ("")}
    </div>
  )
}