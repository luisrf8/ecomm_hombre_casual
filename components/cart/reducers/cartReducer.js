import { createSlice } from '@reduxjs/toolkit';

const initialCartState = (() => {
  const storedCart = localStorage.getItem('cart');
  try {
    return storedCart ? JSON.parse(storedCart) : [];
  } catch (error) {
    console.error('Error al analizar el carrito en el almacenamiento local', error);
    return [];
  }
})();

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action) => {
      const updatedCart = state.filter(item => 
        item.item.id !== action.payload.item.id
        );
      localStorage.setItem('cart', JSON.stringify(updatedCart)); // Actualiza el almacenamiento local
      return updatedCart; // Devuelve el nuevo estado
    },
    removeAllCart: () => {
      const updatedCart = []
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      return updatedCart;
    }
  },
});

export const { addToCart, removeFromCart, removeAllCart } = cartSlice.actions;
export default cartSlice.reducer;
