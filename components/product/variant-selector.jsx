import clsx from 'clsx';
import { useEffect, useState } from 'react';

export function VariantSelector({ options, variants, setItemSelected }) {
  const [selectedOptions, setSelectedOptions] = useState({});
  const [filteredVariants, setFilteredVariants] = useState([]);

  // Actualiza las variantes filtradas cuando cambian las opciones seleccionadas.
  useEffect(() => {
    // Filtra las variantes en función de las opciones seleccionadas.
    const filtradas = variants.filter((variante) =>
      Object.entries(selectedOptions).every(([nombreOpcion, valorOpcion]) => {
        const opcionSeleccionada = variante.selectedOptions.find(
          (opt) => opt.name === nombreOpcion
        );
        return opcionSeleccionada?.value === valorOpcion;
      })
    );
    setFilteredVariants(filtradas);
  }, [selectedOptions, variants]);

  useEffect(() => {
    // Maneja la selección del artículo aquí en función de las variantes filtradas.
    if (filteredVariants.length === 1) {
      setItemSelected(filteredVariants[0]);
    } else {
      setItemSelected(null);
    }
  }, [filteredVariants, setItemSelected]);

  const handleOptionClick = (nombreOpcion, valorOpcion) => {
    setSelectedOptions((opcionesSeleccionadasAnteriores) => ({
      ...opcionesSeleccionadasAnteriores,
      [nombreOpcion]: valorOpcion,
    }));
  };

  const handleClearSelection = () => {
    setSelectedOptions({});
  };

  return (
    <>
      {options.map((opcion) => (
        <div className="" key={opcion.id}>
          <dt className=" text-sm uppercase tracking-wide">
            {opcion.name}
          </dt>
          <dd className="flex flex-wrap gap-3">
            {opcion.values.map((valor) => (
              <button
                key={valor.name}
                onClick={() => handleOptionClick(opcion.name, valor.name)}
                className={clsx(
                  'flex min-w-[48px] items-center justify-center rounded-full border bg-neutral-100 px-2 py-1 text-sm ',
                  {
                    'cursor-pointer': valor.isActive && !selectedOptions[opcion.name],
                    'ring-1 ring-transparent transition duration-300 ease-in-out hover:scale-110 hover:ring-blue-600':
                      !selectedOptions[opcion.name] && filteredVariants.some((variante) =>
                        variante.selectedOptions.some(
                          (opt) =>
                            opt.name === opcion.name &&
                            opt.value === valor.name
                        )
                      ),
                    'ring-2 ring-blue-600': selectedOptions[opcion.name] === valor.name,
                    'relative z-10 cursor-not-allowed overflow-hidden bg-neutral-100 text-neutral-500 ring-1 ring-neutral-300 before:absolute before:inset-x-0 before:-z-10 before:h-px before:-rotate-45 before:bg-neutral-300 before:transition-transform ':
                      !filteredVariants.some((variante) =>
                        variante.selectedOptions.some(
                          (opt) =>
                            opt.name === opcion.name &&
                            opt.value === valor.name
                        )
                      ),
                  }
                )}
              >
                {valor.name}
              </button>
            ))}
          </dd>
        </div>
      ))}
      <button
          onClick={handleClearSelection}
          className="text-sm text-blue-600 cursor-pointer my-4"
        >
          Limpiar selección
      </button>
    </>
  );
}
