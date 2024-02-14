import api from 'lib/axios';
import { useState } from 'react'; // Import useState
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { removeAllCart } from '../cart/reducers/cartReducer';

// Componente reutilizable para campos de entrada
function InputField({ label, name, register, required }) {
  return (
    <div className="sm:col-span-3 mt-4">
      <input
        {...register(name,   { required })}
        style={{height: '2.5rem',}}
        placeholder={label}
        className="block w-[80vw] md:w-250 md:w-[100%] bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
        style={{height: '2.5rem', background: 'transparent'}}
        placeholder={label}
        className="block md:w-[3.5rem] w-[80vw] flex justify-center items-center text-center bg-transparent rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
  const cart = useSelector(state => state.cart)
  const dispatch = useDispatch();
  const [user, setUser] = useState({})

  function handleCleanCart() {
    dispatch(removeAllCart())
  }
  const onSubmitFormOne = (data) => {
    console.log("data 1", data)
    const phoneNumber = `${data.phoneCode}${data.phoneNumber}`
    const client = {
        names: data.firstName,
        dni: data.IDNumber,
        phone: phoneNumber,
        email: data.email,
        address: data.address,
        postalCode: data.postalCode
      }
    api.post(`/customers`, client)
    .then(response => {
      console.log("res", response);
      setUser(response.data.data);
      handleNextStep();
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error)
      });
  };

  const onSubmitFormTwo = (data) => {
    handleNextStep();
  };

  const onSubmitFormThree = (data) => {

    const order = {
      paymentDate:data.date,
      amount:data.amount,
      paymentMethod: data.paymentMethod,
      bankDestine: data.bankDestine,
      bankOrigin: data.bankOrigin,
      reference: data.payID,
      customerID: user._id,
      orderDetails: cart.map(item => ({
        name: item.data.name,
        price: item.data.price,
        quantity: item.quantity,
        articleId: item.data._id
      }))
    };
    console.log('order', order);
    api.post(`/payments`, order)
    .then(response => {
      console.log("res", response);
      handleCleanCart()
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error)
      });

    // Realizar la solicitud GET usando Axios
    // api.post('/payments', data)
    //   .then(response => {
    //     // La respuesta exitosa se almacena en el estado
    //   })
    //   .catch(error => {
    //     console.error('Hubo un error al hacer la solicitud GET:', error);
    //   });
  };
  
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    // if (step < 3) {
    if (step < 2) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // leonardo: 20$
  // Freddy: 15$ 
  // Binance: 30$ 
  // Adrian: 100$ + 25$ intereses
  // Rivero: 100$
  // Jairo: 75$
  // mama: 40$ 

  return (
    <>
      {/* Personal Info */}
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitFormOne)} className=''>
          <div className='flex gap-2'>
          <div>
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Datos Personales</h2>
          <InputField label="Nombre y Apellido" name="firstName" register={register} required/>
          <div className='md:flex md:row md:gap-x-4'>
            <SelectField label="ID  " name="IDCode" register={register} options={[
              { value: "V", label: "V" },
              { value: "J", label: "J" },
              { value: "E", label: "E" },
              { value: "G", label: "G" },
            ]} />
            <div style={{width:"27rem"}}>
              <InputField label="Número de Cédula" name="IDNumber" register={register} required/>
            </div>
          </div>
          <div className='md:flex md:row md:gap-x-4'>
            <SelectField label="Código" name="phoneCode" register={register} options={[
              { value: "+58414", label: "0414" },
              { value: "+58424", label: "0424" },
              { value: "+58412", label: "0412" },
              { value: "+58416", label: "0416" },
              { value: "+58426", label: "0426" },
            ]} />
            <div style={{width:"27rem"}}>
              <InputField label="Número de Teléfono" name="phoneNumber" register={register} required/>
            </div>
          </div>
          
          <InputField label="Email" name="email" register={register} required/>
          <InputField label="Direccion" name="address" register={register} required/>
          <InputField label="Codigo Postal" name="postalCode" register={register} required/>
          {/* <InputField label="Estado" name="region" register={register} required/> */}
          {/* <InputField label="Dirección" name="address" register={register} required/> */}
          </div>
          {/* <div>
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Datos del Vehículo</h2>
          
          <InputField label="Marca del Vehículo" name="vehicle" register={register} required/>
          <InputField label="Modelo" name="model" register={register} required/>
          <InputField label="Año" name="year" register={register} required/>
          </div> */}
          </div>
          <div className='flex justify-end items-center'>
          {/* <label>
            {step} / 3
          </label> */}
            <button
              style={{width: '8rem'}}
              onClick={handleSubmit(onSubmitFormOne)}
              className="rounded-md flex justify-center items-center mt-4 bg-[#022368] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              >
              Crear Orden
            </button>
          </div>
          
        </form>
      )}

      {/* Delivery Info */}
      {step === 2 && (
        <form onSubmit={handleSubmit(onSubmitFormTwo)} className='text-center'>
        <h2 className="text-base font-semibold leading-7 text-[#022368]">Tu orden ha sido procesada con éxito.
        Pronto validaremos los datos y luego recibirás un mensaje con la información de tu compra</h2>
        <div className='flex justify-center'>
          {/* <CheckCircleIcon
            className={clsx('h-5 mr-4 md:h-12 transition-all ease-in-out hover:scale-110 text-green-500')}
          /> */}
        </div>
        <span>Recibe tus productos con seguridad, el tiempo de entrega dependera de la zona geografica de destino</span>
        <fieldset className='pt-5'>
        <p className="mt-1 text-sm leading-6 text-white-600">Escoge tu preferencia.</p>
        <div className="flex row gap-6 mt-4"
          style={{width:"30rem"}}
        >
        <div className="flex items-center gap-x-1">
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              disabled={true}
              className="h-4 w-4 border-blue-300 text-white-600 focus:ring-blue-600"
            />
            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
              Retiro por Agencia
            </label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
              disabled={true}
            />
            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
            Retiro por Centro logistico
            </label>
          </div>
          </div>
        <p className="mt-1 text-sm leading-6 text-white-600">Escoge tu Agencia Favorita.</p>
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

        <InputField label="Ciudad" name="city" register={register} required/>
        <InputField label="Estado" name="region" register={register} required/>
        <InputField label="Dirección de la Agencia" name="deliveredAddress" register={register} required/>

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
              Atras
            </button>
            <button
              style={{width: '6rem'}}
              type="submit"
              className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
        // <form onSubmit={handleSubmit(onSubmitFormThree)}>
        //   <h2 className="text-base font-semibold leading-7 text-[#022368]">Pago.</h2>
        //   {/* Radio Buttons */}
        //   <fieldset className='pt-5'>
        //   <p className="mt-1 text-sm leading-6 text-white-600">Seleccione tu Método de Pago.</p>
        //   <div className="flex row gap-6 mt-4"
        //   >
        //     <div className="flex items-center gap-x-1">
        //       <input
        //         id="push-everything"
        //         name="push-notifications"
        //         type="radio"
        //         className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
        //       />
        //       <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
        //         Pago Movil
        //       </label>
        //     </div>
        //     <div className="flex items-center gap-x-1">
        //       <input
        //         disabled
        //         id="push-email"
        //         name="push-notifications"
        //         type="radio"
        //         className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
        //       />
        //       <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-white-900">
        //         Binance Pay
        //       </label>
        //     </div>
        //     <div className="flex items-center gap-x-1">
        //       <input
        //         disabled
        //         id="push-nothing"
        //         name="push-notifications"
        //         type="radio"
        //         className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
        //       />
        //       <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-white-900">
        //         Zinli
        //       </label>
        //     </div>
        //   </div>
        // </fieldset>
        //   <InputField label="Referencia (ultimos 6 números)" name="payID" register={register} required/>
        //   <InputField label="Fecha" name="date" register={register} required/>
        //   <div className='flex justify-between items-center'>
        //     <label>
        //       {step} / 2
        //     </label>
        //     <div className="sm:col-span-2 mt-6 flex items-center justify-end gap-x-6">
        //       <button
        //         type="button"
        //         onClick={handlePreviousStep}
        //         className="text-sm font-semibold leading-6 text-white-900"
        //       >
        //         Atras
        //       </button>
        //       <button
        //         type="submit"
        //         className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
        //       >
        //         Cargar pago
        //       </button>
        //     </div>
        //   </div>
        // </form>
        
        
      )}

      {/* Payment Info */}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitFormThree)}
        >
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Pago.</h2>

          {/* Radio Buttons */}
          <fieldset className='pt-5'>
          <p className="mt-1 text-sm leading-6 text-white-600">Seleccione tu Método de Pago.</p>
          <div className="flex row gap-6 mt-4"
          >
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
                Zinli
              </label>
            </div>
          </div>
        </fieldset>
          <InputField label="Referencia (ultimos 6 números)" name="payID" register={register} required/>
          <InputField label="Fecha" name="date" register={register} required/>
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
                Cargar pago
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
}
