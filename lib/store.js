import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/auth";
import cartSlice from "./slices/cartReducer";

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

const initialUser = (() => {
  if (typeof localStorage !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : [];
    } catch (error) {
      console.error('Error al analizar el usuario en el almacenamiento local', error);
      return [];
    }
  }
  return [];
})();

export const store = configureStore({
  reducer: {
    auth: userSlice,
    cart: cartSlice
  },
  preloadedState: {
    cart: initialCart,
    auth: initialUser,
  }
});
