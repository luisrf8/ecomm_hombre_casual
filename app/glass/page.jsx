'use client'
import Grid from 'components/grid';
import ProductGridItems from 'components/layout/product-grid-items';
import { products } from 'lib/ddbb.js';
import { usePathname, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useForm } from "react-hook-form";

import axios from 'axios';
export const runtime = 'edge';

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
  return (
    <>
          {/* Personal Info */}
          {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitFormOne)} className=''>
          <div className='flex gap-2'>
          <div>
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Seleccione Marca del Vehículo.</h2>
          <fieldset className='pt-5'>
          <div className="flex row gap-6 mt-4"
            style={{width:"30rem"}}
          >
            <div className="flex items-center gap-x-1" style={{border:'1px solid #404040', borderRadius: '14px', width: '10rem', height:'14rem'}}>
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
                FORD
              </label>
            </div>
            <div className="flex items-center gap-x-1" style={{border:'1px solid #404040', borderRadius: '14px', width: '10rem', height:'14rem'}}>
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
                CHEVROLET
              </label>
            </div>
            <div className="flex items-center gap-x-1" style={{border:'1px solid #404040', borderRadius: '14px', width: '10rem', height:'14rem'}}>
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
                TOYOTA
              </label>
            </div>
          </div>
        </fieldset>
          
          
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
