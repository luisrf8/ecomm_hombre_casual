'use client';
import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import CartModal from './modal';
import { store } from './store';

export default function Cart() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Verificar si hay un usuario en el localStorage
// Recuperar el objeto del localStorage
    const storedUser = localStorage.getItem('user');
    console.log("storedUser", storedUser); // Aquí veremos una cadena JSON
    const parsedUser = JSON.parse(storedUser);  // Usamos JSON.parse para convertirlo de nuevo en objeto
    console.log("parsedUser", parsedUser);
    if (parsedUser) {
      setUser(parsedUser); // Parseamos el objeto almacenado si existe
    }
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <Provider store={store}>
      {/* Pasamos el estado de user a CartModal */}
      <CartModal user={user} />
    </Provider>
  );
}
