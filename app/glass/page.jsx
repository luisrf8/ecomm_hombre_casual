'use client'
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { products } from 'lib/ddbb.js';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from "react-hook-form";

import { RadioGroup } from '@headlessui/react';
import axios from 'axios';
export const runtime = 'edge';
const product = {
  name: 'Basic Tee 6-Pack ',
  price: '$192',
  rating: 3.9,
  reviewCount: 117,
  href: '#',
  imageSrc: 'https://tailwindui.com/img/ecommerce-images/product-quick-preview-02-detail.jpg',
  imageAlt: 'Two each of gray, white, and black shirts arranged on table.',
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'FORD', inStock: true },
    { name: 'CHEVROLET', inStock: true },
    { name: 'AUDI', inStock: true },
    { name: 'TOYOTA', inStock: true },
  ],
}

// export const metadata = {
//   title: 'Glass',
//   description: 'Search for products in the store.'
// };
function InputField({ label, name, register, required }) {
  return (
    <div className="sm:col-span-3 mt-4">
      <input
        {...register(name,   { required })}
        style={{height: '2.5rem', width: '100%'}}
        placeholder={label}
        className="block w-250 bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

// Componente reutilizable para select
function SelectField({ label, name, register, options }) {
  return (
    <div className="sm:col-span-3 mt-4">
      <select
        {...register(name)}
        style={{height: '2.5rem', width:'15rem', background: 'transparent'}}
        placeholder={label}
        className="block w-250 flex justify-center items-center text-center bg-transparent rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className=''>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
export default function SearchPage() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // const { q: searchValue } = searchParams;
  console.log("hola",pathname)
  console.log("como estas", searchParams)
  // Simula la obtención de productos con un array de ejemplo

  // const resultsText = products.length > 1 ? 'results' : 'result';
  const { register, handleSubmit } = useForm();
  
  const onSubmitFormOne = (data) => {
    console.log('Formulario 1 enviado:', data);
    handleNextStep();
  };

  const onSubmitFormTwo = (data) => {
    console.log('Formulario 2 enviado:', data);
    handleNextStep();
  };

  const onSubmitFormThree = (data) => {
    const apiUrl = 'http://localhost:3008/Order';
    // Realizar la solicitud GET usando Axios
    axios.post(apiUrl, data)
      .then(response => {
        // La respuesta exitosa se almacena en el estado
        console.log("peticion",response.data);
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error);
      });
    console.log('Formulario 3 enviado:', data);
  };
  
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }
  const [open, setOpen] = useState(false)
const [selectedColor, setSelectedColor] = useState(product.colors[0])
const [selectedSize, setSelectedSize] = useState(product.sizes[2])
  return (
    <>
    
          {/* Personal Info */}
        {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitFormOne)} className=''>
          <div className="mt-10">
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Seleccione Marca del Vehículo.</h2>
      <RadioGroup value={selectedSize} onChange={setSelectedSize} className="mt-4">
        <div className="grid grid-cols-4 gap-4">
          {product.sizes.map((size) => (
            <RadioGroup.Option
              key={size.name}
              value={size}
              disabled={!size.inStock}
              className={({ active }) =>
                classNames(
                  size.inStock
                    ? 'cursor-pointer bg-white text-gray-900 shadow-sm'
                    : 'cursor-not-allowed bg-gray-50 text-gray-200',
                    active ? 'ring-2 ring-indigo-500' : '',
                    'group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1'
                )
              }
            >
              {({ active, checked }) => (
                <>
                  <RadioGroup.Label as="span">{size.name}</RadioGroup.Label>
                    {size.inStock ? (
                      <span
                        className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-indigo-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-md'
                        )}
                        aria-hidden="true"
                      />
                        ) : (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                        >
                          <svg
                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                            viewBox="0 0 100 100"
                            preserveAspectRatio="none"
                            stroke="currentColor"
                          >
                            <line x1={0} y1={100} x2={100} y2={0} vectorEffect="non-scaling-stroke" />
                          </svg>
                        </span>
                      )}
                  </>
                )}
                </RadioGroup.Option>
              ))}
              </div>
            </RadioGroup>
          </div>
          <div className='flex gap-2'>
          <div>
          </div>
          </div>
          <div className='flex justify-between items-center'>
          <label>
            {step} / 3
          </label>
            <button
              type="submit"
              style={{width: '6rem'}}
              className="rounded-md flex justify-center items-center mt-4 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
              Siguiente
            </button>
          </div>
          
        </form>
      )}

      {/* Delivery Info */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitFormTwo)}>
          <div className='flex gap-2'>
          <div>
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Datos del Vehículo.</h2>
          
          <div className='flex row gap-x-4'>
            <SelectField label="ID  " name="IDCode" register={register} options={[
              { value: "V", label: "FIESTA" },
              { value: "J", label: "EXPLORER" },
              { value: "E", label: "TRITON" },
              { value: "G", label: "MUSTANG" },
            ]} />
          </div>
          <div className='flex row gap-x-4'>
            <SelectField label="Código" name="phoneCode" register={register} options={[
              { value: "+58414", label: "POWER" },
              { value: "+58424", label: "POWER" },
              { value: "+58412", label: "POWER" },
              { value: "+58416", label: "POWER" },
              { value: "+58426", label: "POWER" },
            ]} />
          </div>
          <SelectField label="Código" name="phoneCode" register={register} options={[
              { value: "+58414", label: "1999" },
              { value: "+58424", label: "2000" },
              { value: "+58412", label: "2001" },
              { value: "+58416", label: "2014" },
              { value: "+58426", label: "2022" },
            ]} />
          </div>
          </div>
          <div className='flex justify-between items-center'>
          <label>
            {step} / 3
          </label>
           <button
                type="button"
                onClick={handlePreviousStep}
                className="text-sm font-semibold leading-6 text-white-900"
              >
                Atras
              </button>
            <button
              type="submit"
              style={{width: '6rem'}}
              className="rounded-md flex justify-center items-center mt-4 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
              Siguiente
            </button>
          </div>
          
        </form>
      )}

      {/* Payment Info */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitFormThree)}
        >
          {/* Radio Buttons */}
          {products.length > 0 ? (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      ) : null}
          <div className='flex justify-between items-center'>
            <label>
              {step} / 3
            </label>
            <div className="sm:col-span-2 mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="text-sm font-semibold leading-6 text-white-900"
              >
                Atras
              </button>
              <button
                type="submit"
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Siguiente
              </button>
            </div>
          </div>
        </form>
      )}
      {/* {searchValue ? (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null} */}
     
    </>
  );
}
