import { useState } from 'react';
import { useForm } from "react-hook-form";

export default function App() {
  const { registerFormOne, handleSubmit } = useForm()
  const { registerFormTwo, handleSubmit } = useForm()
  const { registerFormThree, handleSubmit } = useForm()

  
  const onSubmitFormOne = (data) => {
    handleNextStep();
    // Aquí puedes realizar cualquier acción adicional con los datos enviados, incluyendo el procesamiento del pago.
  };
  const onSubmitFormTwo = (data) => {
    handleNextStep();
    // Aquí puedes realizar cualquier acción adicional con los datos enviados, incluyendo el procesamiento del pago.
  };
  const onSubmitFormThree = (data) => {
    // handleNextStep();
    // Aquí puedes realizar cualquier acción adicional con los datos enviados, incluyendo el procesamiento del pago.
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
    
      <h2 className="text-base font-semibold leading-7 text-white-900">Profile</h2>
      <p className="mt-1 text-sm leading-6 text-white-600">
        This information will be displayed publicly, so be careful what you share.
      </p>

      {/* Personal Info */}
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitFormOne)}>
          
          <h2 className="text-base font-semibold leading-7 text-white-900">Personal Info.</h2>
          
          <div className="sm:col-span-3">
            <label 
            className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
            >
              Name
            </label>
            <input {...registerFormOne("firstName", { required: true, maxLength: 20 })} />
            {/* {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )} */}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-white-900">
              ID
            </label>
            <select
              {...registerFormOne("ID", { required: true})}
              className="block bg-transparent w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="V">V</option>
              <option value="J">J</option>
              <option value="E">E</option>
              <option value="G">G</option>
            </select>
            <input {...registerFormOne("IDNumber", { required: true})} 
            className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )} */}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-white-900">
              Phone
            </label>
            <select
              {...registerFormOne("phoneCode", { required: true})}
              className="block bg-transparent w-full rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:max-w-xs sm:text-sm sm:leading-6"
            >
              <option value="+58414">414</option>
              <option value="+58424">424</option>
              <option value="+58412">412</option>
              <option value="+58416">416</option>
              <option value="+58426">426</option>
            </select>
            <input {...registerFormOne("phoneNumber", { required: true})} 
            className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )} */}
          </div>

          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-white-900">
              Email
            </label>
            <input {...registerFormOne("email")} 
            className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )} */}
          </div>
          
          <div className="sm:col-span-3">
            <label className="block text-sm font-medium leading-6 text-white-900">
              Address
            </label>
            <input {...registerFormOne("address", { required: true })} 
            className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
            />
            {/* {errors.firstName && (
              <span className="text-red-500">{errors.firstName.message}</span>
            )} */}
          </div>

          <input type="submit"/>
          
        </form>
      )}
      {/* Delivery Info */}
      {step === 2 && (
        
        <form onSubmit={handleSubmit(onSubmitFormTwo)}>

        <h2 className="text-base font-semibold leading-7 text-white-900">Sending Info.</h2>

        <fieldset className='pt-5'>
          <p className="mt-1 text-sm leading-6 text-gray-600">Choose your favorite.</p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                Zoom
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                MRW
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                Tealca
              </label>
            </div>
          </div>
        </fieldset>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            City
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
            State
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="region"
              id="region"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-3">
          <label className="block text-sm font-medium leading-6 text-white-900">
            Address to delivered
          </label>
          <input {...register("deliveredAddress", { required: true, maxLength: 20 })} 
            className="block w-full bg-transparent rounded-md border-0 py-1.5 text-white-900 shadow-sm ring-inset ring-white-300 placeholder:text-white-400 focus:ring-2 focus:ring-inset focus:ring-white-600 sm:text-sm sm:leading-6"
            />
          {/* {errors.firstName && (
            <span className="text-red-500">{errors.firstName.message}</span>
          )} */}
        </div>

        <button
          type="button"
          onClick={handlePreviousStep}
          className="text-sm font-semibold leading-6 text-white-900"
        >
          Previous
        </button>
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          Next
        </button>
        
      </form>
      )}
      {/* Payment Info */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitFormThree)}>

        <h2 className="text-base font-semibold leading-7 text-white-900">Sending Info.</h2>

        <fieldset className='pt-5'>
          <p className="mt-1 text-sm leading-6 text-gray-600">Choose your favorite.</p>
          <div className="mt-6 space-y-6">
            <div className="flex items-center gap-x-3">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                Pago Movil
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                Binance Pay
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                Metamask
              </label>
            </div>
            <div className="flex items-center gap-x-3">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
              />
              <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                Zinli
              </label>
            </div>
          </div>
        </fieldset>

        <div className="sm:col-span-2 sm:col-start-1">
          <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
            Order ID (last 4 numbers) 
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="city"
              id="city"
              autoComplete="address-level2"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
            Date
          </label>
          <div className="mt-2">
            <input
              datepicker
              type="text"
              name="region"
              id="region"
              autoComplete="address-level1"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

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
        
      </form>
      )}
    </>
  )
}