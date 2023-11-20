"use client"
import { store } from 'components/cart/store';
import FormInputs from 'components/form/formInputs';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';
import CarItems from '../../components/form/cartItems';

export const runtime = 'edge';

export default function FormPage() {
  const router = usePathname()

  return (
    <Provider store={store}>
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8  md:p-12 lg:flex-row lg:gap-8">
          <div className="basis-full lg:basis-4/6 lg:flex lg:justify-center md:flex md:justify-center">
            <FormInputs />
          </div>
          <div className="basis-full lg:basis-2/6">
            <CarItems />
          </div>
        </div>
      </div>
    </>
    </Provider>
  );
}
