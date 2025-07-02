import clsx from 'clsx';

export function VariantSelector({ variants, setItemSelected, itemSelected }) {

  // Genera dinámicamente las opciones a partir de las variantes.
  const options = variants;
  console.log('options', options);
  // Actualiza las variantes filtradas cuando cambian las opciones seleccionadas.
  const handleOptionClick = (option) => {
    setItemSelected(option)
  };

  const handleClearSelection = () => {
    setItemSelected(null);
  };


  return (
    <div className="flex flex-col gap-2">
    <label>Tallas: </label>
      {itemSelected ? (
        <label className="text-sm text-gray-600">
          Talla {itemSelected.size} {itemSelected.stock === 0 ? '(Agotada)' : `${itemSelected.stock} Disponible(s)`}
        </label>
      ) : (
        <label className="text-sm text-gray-600">
          Selecciona una talla
        </label>
      )}

    <div className='flex gap-4 mt-5'>
      {options.map((option) => (
        <div key={option.id}>
          <dd className="flex flex-wrap gap-3">
          <button
              onClick={() => handleOptionClick(option)} // Pasa la opción completa
              disabled={option.stock === 0 }
              className={clsx(
                'flex min-w-[48px] items-center justify-center rounded-full border border-gray-400 bg-gray-100 px-2 py-1 text-sm hover:border-gray-900',
                {
                  'border-gray-900 bg-gray-900 text-white': itemSelected?.id === option.id,
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
    {itemSelected && (
      <button
          onClick={handleClearSelection}
          className="flex justify-left text-sm text-gray-600 cursor-pointer my-2"
        >
          Limpiar selección
        </button>
    )}
    </div>
  );
}
