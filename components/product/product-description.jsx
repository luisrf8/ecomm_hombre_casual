'use client';
import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/product-price';
import Prose from 'components/prose';
// import Image from 'next/image';
import { useEffect, useState } from 'react';
import { VariantSelector } from './variant-selector';

export function ProductDescription(data) {
  const {product} = data
  console.log("hola product", product)
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
        id: itemSelected.id,
        item: itemSelected,
      } 
      setNewItem(newItemConcat)
    } else {
      setNewItem(product)
    }
  }
  return (
    <>
      <div className="mb-4 flex flex-col border-b pb-6">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="">
          <Price amount={product.priceRange.maxVariantPrice.amount} currencyCode={product.priceRange.maxVariantPrice.currencyCode} />
        </div> 
      </div>
      {product.variants ? (
      <VariantSelector options={product.options} variants={product.variants} itemSelected={itemSelected} setItemSelected={setItemSelected} />
      ) : null}
      {product.descriptionHtml ? (
        <Prose className="mb-6 text-sm leading-tight " html={product.descriptionHtml} />
      ) : null}
      <h4>Descripcion del producto:</h4>
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tristique nisl vitae ligula varius, vitae laoreet urna feugiat. Nullam eu lacus vel nibh dignissim ullamcorper. Suspendisse potenti. Fusce nec mauris at ligula suscipit cursus a sit amet justo.</span>
      <div className='flex justify-center mt-2'>
        <AddToCart item={product} availableForSale={product.availableForSale} newItem={newItem}/>
      </div>
    </>
  );
}
