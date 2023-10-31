'use client';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription(data) {
  const {product} = data
  const [itemSelected, setItemSelected] = useState()
  const [newItem , setNewItem] = useState({})
  
  useEffect(() => {
    newItemObject()
  }, [itemSelected]);

  function newItemObject() {
    if (itemSelected) {
      const newItemConcat = {
        featuredImage: {url: product.featuredImage.url},
        handle: product.handle,
        price: product.priceRange.maxVariantPrice.amount,
        title: product.title,
        item: itemSelected,
      }
      setNewItem(newItemConcat)
    }
  }
  return (
    <>
      <div className="mb-6 flex flex-col border-b pb-6 ">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="mr-auto w-auto rounded-full  p-2 text-sm text-white">
          <Price amount={product.priceRange.maxVariantPrice.amount} currencyCode={product.priceRange.maxVariantPrice.currencyCode} />
        </div> 
      </div>

      {/* {product && (
        <Image src={product.featuredImage.url} alt={product.title} 
        width={100}
        height={100}/>
        )} */}
      <VariantSelector options={product.options} variants={product.variants} itemSelected={itemSelected} setItemSelected={setItemSelected}  />
      {product.descriptionHtml ? (
        <Prose className="mb-6 text-sm leading-tight " html={product.descriptionHtml} />
      ) : null}
      <AddToCart variants={product.variants} item={product} availableForSale={product.availableForSale} newItem={newItem}/>
    </>
  );
}
