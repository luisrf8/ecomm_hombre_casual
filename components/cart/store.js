// store.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer.js';

const initialCart = JSON.parse(localStorage.getItem('cart')) || [];

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // Otros reducers si los tienes
  },
  preloadedState: {
    cart: initialCart,
  }
});
