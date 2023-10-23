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
      const existingItem = state.find(item => item.item.id === action.payload.item.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeFromCart: (state, action) => {
      const existingItem = state.find(item => item.item.id === action.payload.item.id);
      if (existingItem) {
        if (existingItem.quantity === 1) {
          state.splice(state.indexOf(existingItem), 1);
        } else {
          existingItem.quantity -= 1;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },

    removeItemFromCart: (state, action) => {
      const updatedCart = state.filter(item => item.item.id !== action.payload.item.id);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    },

    removeAllCart: () => {
      const updatedCart = []
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    }

  },
});

export const { addToCart, removeFromCart, removeAllCart, removeItemFromCart } = cartSlice.actions;
export default cartSlice.reducer;
