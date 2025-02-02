import { createSlice } from '@reduxjs/toolkit';

const initialUserState = (() => {
  if (typeof localStorage !== 'undefined') {
    const storedUser = localStorage.getItem('user');
    try {
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error al analizar la sesión del usuario en el almacenamiento local', error);
      return null;
    }
  }
  return null;
})();

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    login: (state, action) => {
      const userData = action.payload;
      localStorage.setItem('user', JSON.stringify(userData)); // Guarda en localStorage
      return userData;
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
