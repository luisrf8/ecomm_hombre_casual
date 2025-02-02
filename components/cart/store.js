import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../../lib/slices/cartReducer.js/index.js';

const initialCart = (() => {
  if (typeof localStorage !== 'undefined') {
    const storedCart = localStorage.getItem('cart');
    try {
      return storedCart ? JSON.parse(storedCart) : [];
    } catch (error) {
      console.error('Error al analizar el carrito en el almacenamiento local', error);
      return [];
    }
  }
  return [];
})();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState: {
    cart: initialCart,
  }
});
