import { createSlice } from '@reduxjs/toolkit';

const initialUser = (() => {
  if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error al analizar el usuario en el almacenamiento local', error);
      return null;
    }
  }
  return null;
})();

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    login: (state, action) => {
      state = action.payload;
    
      // Guarda en localStorage
      localStorage.setItem('user', JSON.stringify(action.payload)); // Guarda los datos de usuario en localStorage
    
      // Aquí no debemos modificar directamente el estado, sino devolver el nuevo valor
      return action.payload; // Devuelve directamente el objeto del usuario, no lo conviertas a string
    },
    logout: () => {
      localStorage.removeItem('user'); // Elimina del localStorage
      return null;
    },

    updateUser: (state, action) => {
      const updatedUser = { ...state, ...action.payload };
      localStorage.setItem('user', JSON.stringify(updatedUser)); // Actualiza en localStorage
      return updatedUser;
    },
  },
});

export const { login, logout, updateUser } = userSlice.actions;
export default userSlice.reducer;
