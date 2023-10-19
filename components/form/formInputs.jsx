import { useState } from 'react';
import { useForm } from "react-hook-form";

import axios from 'axios';
// Componente reutilizable para campos de entrada
function InputField({ label, name, register, required }) {
  return (
    <div className="sm:col-span-3 mt-4">
      <label className="block text-sm font-medium leading-6 text-white-900 w-full">
        {label}
      </label>
      <input
        {...register(name, { required })}
        style={{height: '2.5rem', width: '100%'}}
        className="block w-250 bg-transparent p-3 rounded-md border-1 border-neutral-200 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      />
    </div>
  );
}

// Componente reutilizable para select
function SelectField({ label, name, register, options }) {
  return (
    <div className="sm:col-span-3 mt-4">
      <label className="block text-sm font-medium leading-6 text-white-900">
        {label}
      </label>
      <select
        {...register(name)}
        style={{height: '2.5rem', width:'3.5rem', background: 'transparent'}}
        className="block w-250 flex justify-center items-center text-center bg-transparent rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-500 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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

export default function App() {
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
          <h2 className="text-base font-semibold leading-7 text-white-900">Personal Info.</h2>
          
          <InputField label="Name" name="firstName" register={register} required/>
          <div className='flex row gap-x-4'>
            <SelectField label="ID Code" name="IDCode" register={register} options={[
              { value: "V", label: "V" },
              { value: "J", label: "J" },
              { value: "E", label: "E" },
              { value: "G", label: "G" },
            ]} />
            <div style={{width:"27rem"}}>
              <InputField label="ID Number" name="IDNumber" register={register} required/>
            </div>
          </div>
          <div className='flex row gap-x-4'>
            <SelectField label="Code" name="phoneCode" register={register} options={[
              { value: "+58414", label: "0414" },
              { value: "+58424", label: "0424" },
              { value: "+58412", label: "0412" },
              { value: "+58416", label: "0416" },
              { value: "+58426", label: "0426" },
            ]} />
            <div style={{width:"27rem"}}>
              <InputField label="Phone Number" name="phoneNumber" register={register} required/>
            </div>
          </div>
          
          <InputField label="Email" name="email" register={register} required/>
          <InputField label="Address" name="address" register={register} required/>

          <div className='flex justify-between items-center'>
          <label>
            {step} / 3
          </label>
            <button
              type="submit"
              style={{width: '4.5rem'}}
              className="rounded-md flex justify-center items-center mt-4 bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
              Next
            </button>
          </div>
        </form>
      )}

      {/* Delivery Info */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitFormTwo)}>
          <h2 className="text-base font-semibold leading-7 text-white-900">Sending Info.</h2>

          {/* Radio Buttons */}
          <fieldset className='pt-5'>
          <p className="mt-1 text-sm leading-6 text-white-600">Choose your favorite Payment Method.</p>
          <div className="flex row gap-6 mt-4"
            style={{width:"30rem"}}
          >
            <div className="flex items-center gap-x-1">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
                ZOOM
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-white-900">
                MRW
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-white-900">
                TEALCA
              </label>
            </div>
          </div>
        </fieldset>

          <InputField label="City" name="city" register={register} required/>
          <InputField label="State" name="region" register={register} required/>
          <InputField label="Address to delivered" name="deliveredAddress" register={register} required/>

          <div className='flex justify-between items-center'>
            <label>
              {step} / 3
            </label>
            <div className="sm:col-span-2 mt-4 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="text-sm font-semibold leading-6 text-white-900"
              >
                Previous
              </button>
              <button
                style={{width: '4.5rem'}}
                type="submit"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
                Next
              </button>
            </div>
          </div>
        </form>
      )}

      {/* Payment Info */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitFormThree)}
        style={{width:"30rem"}}
        >
          <h2 className="text-base font-semibold leading-7 text-white-900">Payment Info.</h2>

          {/* Radio Buttons */}
          <fieldset className='pt-5'>
          <p className="mt-1 text-sm leading-6 text-white-600">Choose your favorite Payment Method.</p>
          <div className="flex row gap-6 mt-4">
            <div className="flex items-center gap-x-1">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
                Pago Movil
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-white-900">
                Binance Pay
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-white-900">
                Metamask
              </label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-white-900">
                Zinli
              </label>
            </div>
          </div>
        </fieldset>

          <InputField label="Order ID (last 4 numbers)" name="payID" register={register} required/>
          <InputField label="Date" name="date" register={register} required/>

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
                Previous
              </button>
              <button
                type="submit"
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Submit and Pay
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
