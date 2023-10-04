import clsx from 'clsx';
export function VariantSelector(data) {
  const { options, variants, setItemSelected } = data;

  const arr = [];
  function selectItems(data) {
    const existingIndex = arr.findIndex((item) => item.id === data.id);
    if (existingIndex !== -1) {
      arr[existingIndex] = { name: data.name, value: data.value, id: data.id };
    } else {
      arr.push({ name: data.name, value: data.value, id: data.id });
    }
    if(arr.length > 1){
      setItemSelected(arr)
    }
  }
  const simulatedVariants = variants;
  const simulatedOptions = options;
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
          const filtered = simulatedOptions.filter(
            (opt) => opt.isActive && opt.name.toLowerCase() === optionNameLowerCase
          );
          const isAvailableForSale = combinations.find((combination) =>
            filtered.every((opt) => combination[opt.name] === opt.values.find((v) => v.isActive))
          );
          const isActive = value.isActive;
          return (
            <button
              key={value.name}
              title={`${option.name} ${value.name}${!isAvailableForSale ? ' (Out of Stock)' : ''}`}
              onClick={() => {
                selectItems({value: value.name, name: option.name, id: option.id})
              }}
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm dark:border-neutral-800 dark:bg-neutral-900',
                {
                  'cursor-pointer ring-2 ring-blue-600': isActive,
                  'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600 ':
                    !isActive,
                  'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform dark:bg-neutral-900 dark:text-neutral-400 dark:ring-neutral-700 before:dark:bg-neutral-700':
                    !isActive,
                }
              )}
            >
              {value.name}
            </button>
          );
        })}
      </dd>
    </dl>
  ));
}
