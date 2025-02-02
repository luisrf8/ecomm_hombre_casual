import { RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import api from 'lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // Import useState
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
        className="md:w-[3.5rem] w-[80vw] flex justify-center items-center text-center bg-transparent rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
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
  const router = useRouter();
  const [user, setUser] = useState(null)
  const [logisticCenters, setLogisticCenters] = useState(null)
  const [selectedLogisticCenter, setSelectedLogisticCenter] = useState(null)
  const [bankEmiter, setBankEmiter] = useState(null)
  const [image, setImage] = useState(null);
  const [paymentDate, setPaymentDate] = useState(null)
  
  // const [bankRecep, setBankRecep] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("storedUser", storedUser); // Aquí veremos una cadena JSON
    const parsedUser = JSON.parse(storedUser);  // Usamos JSON.parse para convertirlo de nuevo en objeto
    console.log("parsedUser", parsedUser);
    if (parsedUser) {
      setUser(parsedUser); // Parseamos el objeto almacenado si existe
    }
  }, [])
  const paymentMethods = [
    {
      id: 1,
      name: "Pago movil"
    },
    // {
    //   id: 2,
    //   name: "Transferencia"
    // },
    // {
    //   id: 3,
    //   name: "Zelle"
    // }
  ]
  const bancosVenezuela = [
    { id: 1, name: "Banco de Venezuela" },
    { id: 2, name: "Banco Mercantil" },
    { id: 3, name: "Banco Provincial" },
    { id: 4, name: "Banco Banesco" },
    { id: 5, name: "Banco Exterior" },
    { id: 6, name: "Banco Fondo Común" },
    { id: 7, name: "Banco Occidental de Descuento (BOD)" },
    { id: 8, name: "Banco Nacional de Crédito (BNC)" },
    { id: 9, name: "Banco del Tesoro" },
    { id: 10, name: "Banco Industrial de Venezuela (BIV)" },
    { id: 11, name: "Banco Activo" },
    { id: 12, name: "Banco Caroní" },
    { id: 13, name: "Banco Agrícola de Venezuela" },
    { id: 14, name: "Banco Sofitasa" },
    { id: 15, name: "Banco Plaza" },
    { id: 16, name: "Banco de la Gente Emprendedora (BanGente)" },
    { id: 17, name: "Banco del Caribe" },
    { id: 18, name: "Banco Mi Casa" },
    { id: 19, name: "Banco Occidental de Descuento (BOD Internacional)" },
    { id: 20, name: "Banco Venezolano de Crédito" },
    // Puedes seguir añadiendo más bancos si lo deseas
];
const handleBankEmiterChange = (event) => {
  setBankEmiter(event.target.value);
};
// const handleBankRecepChange = (event) => {
//   setBankRecep(event.target.value);
// };
const handleImageChange = (event) => {
  const selectedImage = event.target.files[0];
  // Aquí puedes realizar validaciones adicionales si lo deseas
  setImage(selectedImage);
};

function handleRemoveFromCart() {
  dispatch(removeAllCart())
}
  function getLogisticCenters() {
    api.get(`/logistic-centers`)
    .then(response => {
      setLogisticCenters(response.data.data)
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error);
      });
    }
  // function handleCleanCart() {
  //   dispatch(removeAllCart())
  // }
  const onSubmitFormOne = (data) => {
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
      setUser(response.data.data);
      handleNextStep();
      })
      .catch(error => {
        console.error('Hubo un error al hacer la solicitud GET:', error)
      });
  };

  const onSubmitFormTwo = () => {
    console.log("user", user)
    console.log("logistic center", selectedLogisticCenter)
    if(!selectedLogisticCenter || selectedLogisticCenter === null) {
      console.log("debe seleccionar un centro logistico")
    } else {
      handleNextStep();
    }
  };

  const onSubmitFormThree = (data) => {
    console.log("form", data)
    const order = {
      paymentDate: data.paymentDate,
      amount: Number(data.amount),
      paymentMethod: "Pagomovil",
      bankDestine: "Bancamiga",
      bankOrigin: bankEmiter,
      reference: data.payID,
      customerId: user._id,
      logisticCenterId: selectedLogisticCenter,
      orderDetails: cart.map(item => ({
        articleId: item._id,
        quantity: item.quantity
      }))
    };
    console.log("payment", order)
    api.post(`/payments`, order)
    .then(response => {
      console.log("res", response)
      handleNextStep()
      handleRemoveFromCart()
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
    if (step < 4) {
    // if (step < 2) {
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
        {/* <h2 className="text-base font-semibold leading-7 text-[#022368]">Tu orden ha sido procesada con éxito.
        Pronto validaremos los datos y luego recibirás un mensaje con la información de tu compra</h2> */}
        <div className='flex justify-center'>
          {/* <CheckCircleIcon
            className={clsx('h-5 mr-4 md:h-12 transition-all ease-in-out hover:scale-110 text-green-500')}
          /> */}
        </div>
        {/* <span>Recibe tus productos con seguridad, el tiempo de entrega dependera de la zona geografica de destino</span> */}
        <fieldset className='pt-5'>
        <p className="mt-1 text-sm leading-6 text-white-600">Escoge tu preferencia.</p>
        <div className="flex row gap-6 mt-4"
          style={{width:"30rem"}}
        >
        {/* <div className="flex items-center gap-x-1">
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
          </div> */}
          <div className="flex items-center gap-x-1">
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              checked
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
        
          {/* {logisticCenters.map((logisticCenter) => (
          <div className="flex items-center gap-x-1" key={logisticCenter.id}>
            <input
              id="push-everything"
              name="push-notifications"
              type="radio"
              className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
            />
            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
              Centro Logistico: {logisticCenter.name}
            </label>
            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
              Ciudad: {logisticCenter.city}
            </label>
            <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
              Direccion: {logisticCenter.address}
            </label>
          </div>
              ))} */}
          {/* <div className="flex items-center gap-x-1">
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
          </div> */}
        </div>
      </fieldset>
      <RadioGroup value={selectedLogisticCenter} onChange={setSelectedLogisticCenter} className="mt-4 gap-4">
          {logisticCenters.map((logisticCenter) => (
            <RadioGroup.Option
              key={logisticCenter._id}
              value={logisticCenter._id}
              // disabled={!size.inStock}
              className={({ active }) =>
              classNames(
                // size.inStock
                // ? 'cursor-pointer bg-white text-gray-900 shadow-sm h-[15rem] hover:border-blue-400'
                // : 'cursor-not-allowed bg-gray-50 text-gray-200',
                active ? 'ring-2 ring-blue-500' : '',
                'cursor-pointer relative rounded-md h-[5rem] border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 mb-4'
                )
              }
              style={{display:'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'start', textAlign: 'start',}}
              >
              {({ active, checked }) => (
                <>
                  {/* <RadioGroup.Label as="span">Centro Logistico: {logisticCenter.name}</RadioGroup.Label>
                  <RadioGroup.Label as="span">Ciudad: {logisticCenter.city}</RadioGroup.Label>
                  <RadioGroup.Label as="span">Direccion: {logisticCenter.address}</RadioGroup.Label> */}
                  <label as="span">Centro Logistico: {logisticCenter.name}</label>
                  <label as="span">Ciudad: {logisticCenter.city}</label>
                  <label as="span">Direccion: {logisticCenter.address}</label> 
                    {/* {size.inStock ? ( */}
                      <span
                        className={classNames(
                        active ? 'border' : 'border-2',
                        checked ? 'border-blue-500' : 'border-transparent',
                        'pointer-events-none absolute -inset-px rounded-md'
                        )}
                        aria-hidden="true"
                      />
                  </>
                )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
        {/* <InputField label="Ciudad" name="city" register={register} required/>
        <InputField label="Estado" name="region" register={register} required/>
        <InputField label="Dirección de la Agencia" name="deliveredAddress" register={register} required/> */}

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
              // onClick={handleSubmit(onSubmitFormTwo)}
              // onClick={handleNextStep}
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
        <div>
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Pago.</h2>
        <form onSubmit={handleSubmit(onSubmitFormThree)} className='flex md:flex-row flex-col gap-8'
        >
          <div className=''>
            <p className="mt-1 text-sm leading-6 text-white-600">Seleccione tu Método de Pago.</p>
            <div className='flex items-center gap-2 mt-1'>
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                checked
                className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
                disabled={true}
              />
              <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-white-900">
              Pago Movil
              </label>
            </div>
            <div className="mt-2">
            <p className="mt-1 text-sm leading-6 text-white-600">Seleccione Banco Emisor.</p>
              <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-[80vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleBankEmiterChange}
                  value={bankEmiter}
                >
                <option value="">Selecciona un banco</option>
                {bancosVenezuela.map((bank) => (
                    <option key={bank.id} value={bank.name}>{bank.name}</option>
                ))}
                </select>
              </div>
            <p className="mt-1 text-sm leading-6 text-white-600">Datos:</p>
              <div className='gap-2 px-4 md:h-[6rem] md:w-[100%] w-[80vw] h-[6rem] mt-1 cursor-pointer relative rounded-md border text-sm  hover:bg-gray-50 focus:outline-none sm:flex-1 '
              style={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'start', textAlign: 'start',}}
              >
              <label>
                Banco: Bancamiga
              </label>
              <label>
                Teléfono: 04148859372 
              </label>
              <label>
                DNI: 27195915 
              </label>
              </div>
              {/* <div className="mt-2">
              <p className="mt-1 text-sm leading-6 text-white-600">Seleccione Banco Receptor.</p>
                <select
                  id="country"
                  name="country"
                  autoComplete="country-name"
                  className="block w-[80vw] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-blue-500 sm:max-w-xs sm:text-sm sm:leading-6"
                  onChange={handleBankRecepChange}
                  value={bankRecep}
                >
                <option value="">Selecciona un banco</option>
                {bancosVenezuela.map((bank) => (
                    <option key={bank.id} value={bank.name}>{bank.name}</option>
                ))}
                </select>
              </div> */}

            {/* <RadioGroup value={selectedLogisticCenter} onChange={setSelectedLogisticCenter} className="flex mt-4 gap-4">
              {paymentMethods.map((paymentMethod) => (
                <RadioGroup.Option
                  key={paymentMethod.id}
                  value={paymentMethod.id}
                  className={({ active }) =>
                  classNames(
                    active ? 'ring-2 ring-blue-500' : '',
                    'cursor-pointer w-[8.5rem] h-[2.5rem] relative rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 mb-4'
                    )
                  }
                  style={{display:'flex', justifyContent: 'center', alignItems: 'start', textAlign: 'center',}}
                  >
                  {({ active, checked }) => (
                    <>
                    <label as="span">{paymentMethod.name}</label>
                        <span
                          className={classNames(
                          active ? 'border' : 'border-2',
                          checked ? 'border-blue-500' : 'border-transparent',
                          'pointer-events-none absolute -inset-px rounded-md'
                          )}
                          aria-hidden="true"
                        />
                    </>
                  )}
                  </RadioGroup.Option>
                ))}
            </RadioGroup> */}
          </div>
          <div className='items-center'>
            <p className="text-sm leading-6 text-white-600">Ingrese Referencias de pago.</p>
            <div className='flex gap-5  md:flex-row flex-col '>
            <div className='md:w-[8.5rem]  w-[80vw] h-[9.5rem] mt-[1rem] cursor-pointer relative rounded-md border text-sm hover:bg-gray-50 focus:outline-none sm:flex-1'
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'start' }}>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: 'none' }}
                id="imageInput"
            />
            <label htmlFor="imageInput">
              {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
              {!image && <PhotoIcon className='h-10 cursor-pointer transition-all ease-in-out hover:scale-110 text-black-900' />}
            </label>
            <label htmlFor="imageInput" className='cursor-pointer'>Referencia</label>
            </div>
              <div className='w-[16rem]'>
              <input
        {...register("payID")}
        style={{height: '2.5rem',}}
        required
        type='number'
        placeholder="Referencia (ultimos 6 números)"
        className="block w-[80vw]  mt-4 md:w-250 md:w-[100%] bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      />
      <input
        {...register("amount")}
        style={{height: '2.5rem',}}
        required
        type='number'
        placeholder="Monto"
        className="block w-[80vw] mt-4 md:w-250 md:w-[100%] bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
      />
                {/* <InputField label="Monto" name="amount" register={register} required/> */}
                <input type="date"
                {...register("paymentDate")}
                 name="paymentDate"
                 className=" block w-[80vw] mt-4 md:w-250 md:w-[100%]  justify-center items-center text-center bg-transparent rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </form>
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
                onClick={handleSubmit(onSubmitFormThree)}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
              >
                Cargar pago
              </button>
            </div>
          </div>
        </div>
      )}
      {step === 4 && (
        <form onSubmit={handleSubmit(onSubmitFormTwo)} className='text-center'>
        <h2 className="text-base font-semibold leading-7 text-[#022368]">Tu orden ha sido procesada con éxito.
        Pronto validaremos los datos y luego recibirás un mensaje con la información de tu compra</h2>
        <div className='flex justify-center'>
          <CheckCircleIcon
            className={clsx('h-5 mr-4 md:h-12 transition-all ease-in-out hover:scale-110 text-green-500')}
          />
        </div>
        {/* <span>Recibe tus productos con seguridad, el tiempo de entrega dependera de la zona geografica de destino</span> */}
        
        <div className='flex justify-between items-center'>
          {/* <label>
            {step} / 3
          </label> */}
          <div className="sm:col-span-2 mt-4 flex items-center justify-end gap-x-6">
            {/* <button
              type="button"
              onClick={handlePreviousStep}
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Atras
            </button> */}
            <button
              style={{width: '6rem'}}
              type="submit"
              // onClick={handleSubmit(onSubmitFormTwo)}
              // onClick={handleNextStep}
              onClick={() => router.push('/')}
              className="rounded-md bg-blue-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Siguiente
            </button>
          </div>
        </div>
      </form>
      )}
    </>
  );
}
