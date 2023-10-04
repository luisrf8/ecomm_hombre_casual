'use client';
// import { cookies } from 'next/headers';
export const cart = JSON.parse(localStorage.getItem('cart')) || [];
// localStorage.setItem('cart', JSON.stringify(cart));
export const addItem = async (Item) => {
  console.log("luisCartFunction", Item)
  
  cart.push(Item);
  console.log("luisCartLocalStorageFunction", cart)
  updateCart();
  
};

export const removeItem = async (Item) => {

};

export const updateItemQuantity = async ({}) => {
  
};
// Función para actualizar el carrito en localStorage
export const updateCart = () => {
  localStorage.setItem('cart', JSON.stringify(cart));
  console.log("Luis", localStorage.getItem('cart'))
};
