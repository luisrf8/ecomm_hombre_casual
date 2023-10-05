import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart')) || [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('cart', JSON.stringify(state))
    },
    removeFromCart: (state, action) => {
        const updatedCart = state.filter(item => item.id !== action.payload.id);
        state = updatedCart;
        localStorage.setItem('cart', JSON.stringify(state));
    },
    
    // Otros reducers para el carrito de compras
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
