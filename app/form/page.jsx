"use client"
import { store } from 'components/cart/store';
import FormInputs from 'components/form/formInputs';
import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';

export const runtime = 'edge';

// export const metadata = {
//   title: 'Form',
//   description: 'Form payment.'
// };

export default function FormPage({ searchParams }) {
  const { q: searchValue } = searchParams;
  
  const router = usePathname()
  console.log("luis router", router)

  return (
    <Provider store={store}>
    <>
      <div className="mx-auto max-w-screen-2xl px-4">
        <div className="flex flex-col rounded-lg border border-neutral-200 bg-white p-8 dark:border-neutral-800 dark:bg-black md:p-12 lg:flex-row lg:gap-8">
          <div className="basis-full lg:basis-2/6">
            <FormInputs />
          </div>
        </div>
      </div>
    </>
    </Provider>
  );
}
