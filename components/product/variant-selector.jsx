import clsx from 'clsx';
import { createUrl } from 'lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

// Definir un objeto simulado de variantes y opciones
const simulatedVariants = [
  {
    id: 'variant-1',
    availableForSale: true,
    color: 'Red',
    size: 'Small',
  },
  {
    id: 'variant-2',
    availableForSale: true,
    color: 'Blue',
    size: 'Medium',
  },
  // Agregar más variantes simuladas si es necesario
];

const simulatedOptions = [
  {
    id: 'option-color',
    name: 'Color',
    values: ['Red', 'Blue', 'Green'],
  },
  {
    id: 'option-size',
    name: 'Size',
    values: ['Small', 'Medium', 'Large'],
  },
  // Agregar más opciones simuladas si es necesario
];

export function VariantSelector() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasNoOptionsOrJustOneOption =
    !simulatedOptions.length ||
    (simulatedOptions.length === 1 && simulatedOptions[0]?.values.length === 1);

  if (hasNoOptionsOrJustOneOption) {
    return null;
  }

  const combinations = simulatedVariants.map((variant) => ({
    id: variant.id,
    availableForSale: variant.availableForSale,
    ...variant,
  }));

  return simulatedOptions.map((option) => (
    <dl className="mb-8" key={option.id}>
      <dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
      <dd className="flex flex-wrap gap-3">
        {option.values.map((value) => {
          const optionNameLowerCase = option.name.toLowerCase();

          const optionSearchParams = new URLSearchParams(searchParams.toString());

          optionSearchParams.set(optionNameLowerCase, value);
          const optionUrl = createUrl(pathname, optionSearchParams);

          const filtered = Array.from(optionSearchParams.entries()).filter(([key, value]) =>
            simulatedOptions.find(
              (option) => option.name.toLowerCase() === key && option.values.includes(value)
            )
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every(
              ([key, value]) => combination[key] === value && combination.availableForSale
            )
          );

          const isActive = searchParams.get(optionNameLowerCase) === value;

          return (
            <button
              key={value}
              aria-disabled={!isAvailableForSale}
              disabled={!isAvailableForSale}
              onClick={() => {
                router.replace(optionUrl, { scroll: false });
              }}
              title={`${option.name} ${value}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                {
                  'cursor-default ring-2 ring-blue-600': isActive,
                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
                    !isActive && isAvailableForSale,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                    !isAvailableForSale
                }
              )}
            >
              {value}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}
