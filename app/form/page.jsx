"use client";
import FormInputs from 'components/form/formInputs';
import { useSelector } from 'react-redux';
import CarItems from '../../components/form/cartItems';


export default function FormPage() {
  const cart = useSelector(state => state.cart);

  const isCartEmpty = cart?.length === 0 || !cart;  // Verificar si el carrito está vacío

  return (
    <>
      <div className="mx-auto mt-50 max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 md:p-12 lg:flex-row lg:gap-8">
          <div className={`basis-full ${isCartEmpty ? "lg:basis-full" : "lg:basis-4/6"} lg:flex lg:justify-center md:flex md:justify-center`}>
            <FormInputs />
          </div>
          {!isCartEmpty && (
            <div className="basis-full lg:basis-2/6">
              <CarItems />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
