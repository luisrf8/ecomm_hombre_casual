'use client';
import { Provider } from 'react-redux';
import CartModal from './modal';
import { store } from './store';

export default async function Cart() {

  return (
    <Provider store={store}>
      <CartModal />
    </Provider>
  );
}
