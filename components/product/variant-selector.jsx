import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function VariantSelector({ variants, setItemSelected }) {
  const [selectedOptions, setSelectedOptions] = useState([]);

  // Genera dinámicamente las opciones a partir de las variantes.
  const options = variants;

  // Actualiza las variantes filtradas cuando cambian las opciones seleccionadas.
  const handleOptionClick = (option) => {
    setSelectedOptions(option)
  };

  const handleClearSelection = () => {
    setSelectedOptions([]);
  };

  // useEffect para observar cambios en selectedOptions
  useEffect(() => {
    console.log("selectedOptions", selectedOptions); // Aquí puedes ver el valor actualizado
    setItemSelected(selectedOptions)
  }, [selectedOptions]);

  return (
    <>
    <div className='flex gap-4'>
      {options.map((option) => (
        <div key={option.id}>
          <dd className="flex flex-wrap gap-3">
          <button
              onClick={() => handleOptionClick(option)} // Pasa la opción completa
              disabled={option.stock === 0 }
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border bo bg-neutral-100 px-2 py-1 text-sm ',
                {
                  'border-blue-900': selectedOptions.id === option.id,
                  'bg-gray-100 text-gray-500 cursor-not-allowed': option.stock === 0,
                }
              )}
            >
              {option.size}
            </button>
          </dd>
        </div>
      ))}
    </div>
      <button
          onClick={handleClearSelection}
          className="text-sm text-blue-600 cursor-pointer my-4"
        >
          Limpiar selección
      </button>
    </>
  );
}
