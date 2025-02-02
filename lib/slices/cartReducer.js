import { createSlice } from '@reduxjs/toolkit';

const initialCartState = (() => {
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

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      console.log("action.payload", action.payload)
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state));  // Actualiza localStorage
    },

    removeFromCart: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.splice(state.indexOf(existingItem), 1);
        } else {
          existingItem.quantity -= 1;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));  // Actualiza localStorage
    },

    removeItemFromCart: (state, action) => {
      const updatedCart = state.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));  // Actualiza localStorage
      return updatedCart;
    },

    removeAllCart: () => {
      const updatedCart = [];
      localStorage.setItem('cart', JSON.stringify(updatedCart));  // Actualiza localStorage
      return updatedCart;
    },
  },
});

export const { addToCart, removeFromCart, removeItemFromCart, removeAllCart } = cartSlice.actions;
export default cartSlice.reducer;
