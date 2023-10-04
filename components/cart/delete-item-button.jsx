import { XMarkIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import LoadingDots from 'components/loading-dots';
// import { useRouter } from 'next/router';
import { useTransition } from 'react';

export default function DeleteItemButton({ item }) {
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <button
      aria-label="Remove cart item"
      onClick={() => {
        startTransition(async () => {
          // Simula la eliminación de un elemento del carrito. Puedes reemplazar esto con la lógica real de eliminación del carrito.
          const simulatedRemoveItem = async (itemId) => {
            // Simulación de la eliminación de un elemento del carrito.
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(null); // Devuelve null si la eliminación es exitosa o un mensaje de error si falla.
              }, 1000); // Simulamos un retraso de 1 segundo.
            });
          };

          const error = await simulatedRemoveItem(item.id);

          if (error) {
            // Trigger the error boundary in the root error.js
            throw new Error(error.toString());
          }

          // router.reload();
        });
      }}
      disabled={isPending}
      className={clsx(
        'ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500 transition-all duration-200',
        {
          'cursor-not-allowed px-0': isPending
        }
      )}
    >
      {isPending ? (
        <LoadingDots className="bg-white" />
      ) : (
        <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-white dark:text-black" />
      )}
    </button>
  );
}
