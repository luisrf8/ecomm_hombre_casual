import { CheckCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import api from 'lib/axios';
import { removeAllCart } from 'lib/slices/cartReducer';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // Import useState
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
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
  const { register, handleSubmit, setValue } = useForm();
  const cart = useSelector(state => state.cart)
  const [totalAmount, setTotalAmount] = useState(0);
  const user = useSelector(state => state.auth);
  const [preference, setPreference] = useState('retiro-en-tienda'); // valor inicial para Envío Nacional
  const [direccion, setDireccion] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [preferencePayment, setPreferencePayment] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [image, setImage] = useState(null);
  const [payments, setPayments] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();
  
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];  // Fecha de hoy en formato YYYY-MM-DD
    setValue("paymentDate", today);  // Establecer el valor predeterminado
  }, [setValue]); // Esta dependancia asegura que se ejecute solo cuando el setValue esté disponible

  useEffect(() => {
    totalCardAmount()
  }, [cart])
  
  function totalCardAmount() {
    let total = 0
    for (let i = 0; i < cart.length; i++) {
      const amount = cart[i].quantity * cart[i].price
      total += amount      
    }
    setTotalAmount(total)
  }
const onSubmitFormOne = (data) => {
  console.log("cart", cart)
  // Aquí puedes manejar los datos según la preferencia y la dirección
  const formData = {
    preference,
    direccion,
    ...data, // Incluir otros campos del formulario si los tienes
  };
  api.get('api/payment-methods/ecomm',)
  .then((response) => {
    console.log("response.data", response.data)
    setPaymentMethods(response.data)
    handleNextStep(formData); // Pasa los datos al siguiente paso
  })
  .catch((error) => {
    console.log("error", error)
  })
};

const handlePreferenceChange = (e) => {
  setPreference(e.target.value);
};

const handleCurrencyChange = (e) => {
  setSelectedCurrency(e.target.value);
  setPreferencePayment(null);
};

const handlePreferencePaymentChange = (e) => {
  const selectedMethod = paymentMethods[selectedCurrency].find(
    (method) => method.name === e.target.value
  );
  setPreferencePayment(selectedMethod);
};

const methodsForCurrency = paymentMethods[selectedCurrency] || [];

const handleImageChange = () => {
  const fileInput = document.getElementById('image');  // Obtener el input por id
  const file = fileInput.files[0];  // Obtener el primer archivo (si hay más de uno)

  console.log(file);  // Verifica en consola si es un objeto File
  setImage(file);  // Aquí asignas el archivo al estado
};


  // Agregar un nuevo pago
  const addPayment = (data) => {
    console.log("preferencePayment", preferencePayment)
    setPayments((prevPayments) => [
      ...prevPayments,
      {
        currency: selectedCurrency,
        method: preferencePayment,
        reference: data.payID,
        amount: data.amount,
        paymentDate: data.paymentDate,
        img: image, // Si existe una imagen, se agrega
      },
    ]);
    // Limpiar la imagen y los campos después de agregar el pago
    setImage(null);
    setValue("payID", "");
    setValue("amount", "");
    setValue("paymentDate", "");
 };

  // Enviar todos los pagos
  const onSubmit = () => {
    console.log("Pagos enviados:", payments);
    // Aquí puedes enviar los datos de pagos al servidor
  };

  const onSubmitFormTwo = () => {
      handleNextStep();
  };
  const getTotalPayments = () => {
    return payments.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);
  };
  const totalPayments = getTotalPayments();
  
  const onSubmitFormThree = (data) => {
    // Combinar todos los datos relevantes
    const formData = new FormData();
    
    // Agregar datos simples (como totalAmount, customer_id, etc.)
    formData.append("totalAmount", totalAmount);
    formData.append("itemsSelected", JSON.stringify(cart));  // Convertir cart a JSON para enviarlo
    formData.append("customer_id", user.user.id);
    formData.append("preference", preference);
    formData.append("direccion", direccion);
    // Agregar los pagos (incluyendo la imagen)
    payments.forEach((payment, index) => {
      formData.append(`paymentDetails[${index}][amount]`, payment.amount);
      formData.append(`paymentDetails[${index}][currency]`, payment.currency);
      formData.append(`paymentDetails[${index}][method]`, JSON.stringify(payment.method));
      formData.append(`paymentDetails[${index}][reference]`, payment.reference);
      formData.append(`paymentDetails[${index}][paymentDate]`, payment.paymentDate);
   
      formData.append(`paymentDetails[${index}][img]`, payment.img);

  });
  for (let [key, value] of formData.entries()) {
      console.log(key, value);
  }
    
    // Realiza la solicitud POST usando fetch o axios
    api.post('api/create-sale/ecomm', formData, {
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    }) // Asegúrate de usar el endpoint adecuado
      .then((response) => {
        console.log("Respuesta del servidor:", response.data);
        dispatch(removeAllCart())
        router.push("/"); // Redirigir a la página de inicio
        // Lógica adicional después de enviar los datos
      })
      .catch((error) => {
        console.log("Error al enviar los datos:", error);
      });
  };
  
  const [step, setStep] = useState(1);

  const handleNextStep = () => {
    if (step < 4) {
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
              <h2 className="text-base font-semibold leading-7 text-[#022368]">
                Hola! {user?.user?.name}.
              </h2>
              <p className="mt-1 text-sm leading-6 text-white-600">Escoge tu preferencia.</p>
              <div className="flex row gap-6 mt-4" style={{ width: "30rem" }}>
                <div className="flex items-center gap-x-1">
                  <input
                    id="Tienda"
                    name="preference"
                    type="radio"
                    value="Tienda"
                    checked={preference === 'Tienda'}
                    onChange={handlePreferenceChange}
                    className="h-4 w-4 border-blue-300 text-white-600 focus:ring-blue-600"
                  />
                  <label htmlFor="Tienda" className="block text-sm font-medium leading-6 text-white-900">
                    Retiro en Tienda
                  </label>
                </div>
                <div className="flex items-center gap-x-1">
                  <input
                    id="Envio"
                    name="preference"
                    type="radio"
                    value="Envio"
                    checked={preference === 'Envio'}
                    onChange={handlePreferenceChange}
                    className="h-4 w-4 border-gray-300 text-white-600 focus:ring-blue-600"
                  />
                  <label htmlFor="Envio" className="block text-sm font-medium leading-6 text-white-900">
                    Envío Nacional
                  </label>
                </div>
              </div>

              {/* Condicional: Mostrar campo de dirección solo si "Envío Nacional" está seleccionado */}
              {preference === 'Envio' && (
                <div className="mt-4">
                  <label className="block text-sm font-medium leading-6 text-white-900">
                    Por favor ingrese la dirección de la agencia Zoom de su preferencia:
                  </label>
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="block w-[80vw]  mt-4 md:w-250 md:w-[100%] bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                    placeholder="Dirección de la agencia Zoom"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end items-center">
            <label>{step} / 3</label>
            <button
              style={{ width: '8rem' }}
              onClick={handleSubmit(onSubmitFormOne)}
              className="rounded-md flex justify-center items-center mt-4 bg-[#022368] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Siguiente
            </button>
          </div>
        </form>
      )}
      {/* Payment Info */}
      {step === 2 && (
        <div>
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Pago.</h2>
          <form onSubmit={handleSubmit(addPayment)} className="flex md:flex-row flex-col gap-8">
        {/* Selección de moneda */}
        <div>
          <div className="flex row gap-6" style={{ width: "30rem" }}>
            {Object.keys(paymentMethods).map((currency) => (
              <div className="flex items-center gap-x-1" key={currency}>
                <input
                  id={currency}
                  name="currency"
                  type="radio"
                  value={currency}
                  checked={selectedCurrency === currency}
                  onChange={handleCurrencyChange}
                  className="h-4 w-4 border-blue-300 text-white-600 focus:ring-blue-600"
                />
                <label htmlFor={currency} className="block text-sm font-medium leading-6 text-white-900">
                  {currency}
                </label>
              </div>
            ))}
          </div>

          {/* Mostrar los métodos de pago según la moneda seleccionada */}
          {methodsForCurrency.length > 0 && (
            <div>
              <div className="flex row gap-6 mt-2">
                {methodsForCurrency.map((method) => (
                  <div className="flex items-center gap-x-1" key={method.id}>
                    <input
                      id={method.name}
                      name="preferencePayment"
                      type="radio"
                      value={method.name}
                      checked={preferencePayment?.name === method.name}
                      onChange={handlePreferencePaymentChange}
                      className="h-4 w-4 border-blue-300 text-white-600 focus:ring-blue-600"
                    />
                    <label htmlFor={method.name} className="block text-sm font-medium leading-6 text-white-900">
                      {method.name}
                    </label>
                  </div>
                ))}
              </div>

              {/* Mostrar detalles del método de pago seleccionado */}
              {preferencePayment && (
                <div className='mt-2'>
                  <div>ID: {preferencePayment.dni}</div>
                  <div>Banco: {preferencePayment.bank}</div>
                  <div>Nombre del Beneficiario: {preferencePayment.admin_name}</div>
                  <div>QR:</div>
                  <div>
                    {preferencePayment.qr_image && preferencePayment.qr_image !== '[]' ? (
                      <div
                        style={{
                          width: '100px',
                          height: '100px',
                          backgroundImage: `url(${process.env.BASE_URL}/storage/${JSON.parse(preferencePayment.qr_image)[0]})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          border: '1px solid #ddd',
                          borderRadius: '8px',
                        }}
                      ></div>
                    ) : (
                      <PhotoIcon className='h-10 cursor-pointer transition-all ease-in-out hover:scale-110 text-black-900' />
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        {/* Campos de referencia, monto, imagen y fecha */}
        {preferencePayment && (
        <div className='items-center'>
          <p className="text-sm leading-6 text-white-600">Ingrese Referencias de pago.</p>
          <div className='flex gap-5 md:flex-row flex-col'>
            {/* <div className='md:w-[8.5rem] w-[80vw] h-[9.5rem] mt-[1rem] cursor-pointer relative rounded-md border text-sm hover:bg-gray-50 focus:outline-none sm:flex-1'
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'start' }}>
              <input 
                type="file" 
                onChange={handleImageChange} 
                accept="image/*" 
                id="image" name="image"
                className="file-input" 
              />
              <label htmlFor="imageInput">
                {image && <img src={URL.createObjectURL(image)} alt="Preview" />}
                {!image && <PhotoIcon className='h-10 cursor-pointer transition-all ease-in-out hover:scale-110 text-black-900' />}
              </label>
              <label htmlFor="imageInput" className='cursor-pointer'>Referencia</label>
            </div> */}

            <div className='w-[16rem]'>
              <input
                {...register("payID")}
                style={{ height: '2.5rem' }}
                required
                type='number'
                placeholder="Referencia (últimos 6 números)"
                className="block w-[80vw] mt-4 md:w-250 md:w-[100%] bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              <input
                {...register("amount")}
                style={{ height: '2.5rem' }}
                required
                type='number'
                placeholder="Monto"
                className="block w-[80vw] mt-4 md:w-250 md:w-[100%] bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
              <input
                type="date"
                {...register("paymentDate")}
                name="paymentDate"
                className=" block w-[80vw] mt-4 md:w-250 md:w-[100%] justify-center items-center text-center bg-transparent rounded-md border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-black-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
        )}

        {/* Agregar pago */}
        <div className='flex justify-between items-center'>
          <div className="sm:col-span-2 mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              onClick={() => setPayments([])}
              className="text-sm font-semibold leading-6 text-white-900"
            >
              Limpiar pagos
            </button>
            {totalPayments < totalAmount ? (
                <button
                  onClick={handleSubmit(addPayment)}
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Agregar pago
                </button>
              ) : (
                ''
              )}

          </div>
        </div>
      </form>
      <div>
        {/* Mostrar pagos agregados */}
        {payments.length > 0 && (
          <div>
            <h3>Pagos agregados:</h3>
            <ul>
              {payments.map((payment, index) => (
                <li key={index}>
                  Referencia: {payment.reference} - Monto: {payment.amount} USD - Fecha: {payment.paymentDate}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
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
              {totalPayments < totalAmount ? (
                ''
              ) : (
                <button
                onClick={handleSubmit(onSubmitFormThree)}
                className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Cargar pago
                </button>
              )}
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitFormTwo)} className='text-center'>
          <h2 className="text-base font-semibold leading-7 text-[#022368]">Tu orden ha sido procesada con éxito.
          Pronto validaremos los datos y luego recibirás un mensaje con la información de tu compra</h2>
          <div className='flex justify-center'>
            <CheckCircleIcon
              className={clsx('h-5 mr-4 md:h-12 transition-all ease-in-out hover:scale-110 text-green-500')}
            />
          </div>
          <div className='flex justify-between items-center'>

            <div className="sm:col-span-2 mt-4 flex items-center justify-end gap-x-6">

              <button
                style={{width: '6rem'}}
                type="submit"
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
