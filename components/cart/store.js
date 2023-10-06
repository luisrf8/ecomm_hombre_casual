// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer.js';

const initialCart = (() => {
  const storedCart = localStorage.getItem('cart');
  try {
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error al analizar el carrito en el almacenamiento local', error);
    return [];
  }
})();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: initialCart,
  }
});
