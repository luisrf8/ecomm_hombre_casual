import { CheckCircleIcon, PhotoIcon } from '@heroicons/react/24/outline';
import WsMsg from 'components/ws-msg';
import api from 'lib/axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react'; // Import useState
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { removeAllCart } from '../../lib/slices/cartReducer';


export default function App() {
  const { register, handleSubmit, setValue } = useForm();
  const cart = useSelector(state => state.cart)
  const [totalAmount, setTotalAmount] = useState(0);
  const [dollarRate, setDollarRate] = useState(0);
  const user = useSelector(state => state.auth);
  const [preference, setPreference] = useState('retiro-en-tienda'); // valor inicial para Envío Nacional
  const [direccion, setDireccion] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('');
  const [preferencePayment, setPreferencePayment] = useState('');
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [image, setImage] = useState(null);
  const [payments, setPayments] = useState([]);
  const [rawAmount, setRawAmount] = useState(""); // Guardar lo que el usuario escribe
  const [loading, setLoading] = useState(false);
  const [today, setToday] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  
  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0]; // Obtiene la fecha en formato YYYY-MM-DD
    setToday(currentDate);
  }, []);

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
  api.get('api/dollarRate',)
  .then((response) => {
    console.log("response.data", response.data)
    setDollarRate(Number(response.data.data.rate))
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

  const addPayment = (data) => {
    console.log("data", data)
    if (!data.payID || !data.amount || !data.paymentDate) {
      console.log("Por favor complete todos los campos requeridos.");
      return;
    }
  
    if (!preferencePayment) {
      console.log("Por favor, seleccione un método de pago.");
      return;
    }
  
    let amountToSave = parseFloat(data.amount);
    if (isNaN(amountToSave) || amountToSave <= 0) {
      console.log("Ingrese un monto válido.");
      return;
    }
  
    // Conversión si la moneda es "Bolívares"
    if (selectedCurrency === "Bolívares") {
      console.log("Monto convertido a USD:", dollarRate);
      amountToSave = amountToSave / dollarRate;
      console.log("Monto convertido a USD:", amountToSave);
    }
  
    const newPayment = {
      currency: selectedCurrency,
      method: preferencePayment,
      reference: data.payID,
      amount: amountToSave.toFixed(2), // Guarda el monto con dos decimales
      paymentDate: data.paymentDate,
      img: image || null, // Evitar valores `undefined`
    };
  
    setPayments((prevPayments) => [...prevPayments, newPayment]); // Agregar pago con el monto convertido
    console.log("payments", payments)
    setImage(null); // Limpiar imagen si existe
    setRawAmount(""); // Limpiar el campo de cantidad
    // reset(); // Reiniciar el formulario
        setImage(null);
    setValue("payID", "");
    setValue("amount", "");
  };
  
  const onSubmitFormTwo = () => {
      handleNextStep();
  };
  const getTotalPayments = () => {
    return payments.reduce((sum, payment) => sum + parseFloat(payment.amount || 0), 0);
  };
  const totalPayments = getTotalPayments();
  
  const onSubmitFormThree = (data) => {
    setLoading(true); // Iniciar el estado de carga
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
        setLoading(false); // Detener el estado de carga
        setStep(step + 1);
        // router.push("/"); // Redirigir a la página de inicio
        // Lógica adicional después de enviar los datos
      })
      .catch((error) => {
        setLoading(false); // Detener el estado de carga
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
    <div className='flex flex-col gap-4 p-4'>
        {/* Personal Info */}
      {step === 1 && (
        <form onSubmit={handleSubmit(onSubmitFormOne)} className=''>
          <div className='flex gap-2'>
            <div>
              <h2 className="text-base font-semibold leading-7 text-black">
                Hola! {user?.user?.name}.
              </h2>
              <p className="mt-1 text-sm leading-6 text-white-600">Escoge tu preferencia.</p>
              <div className="flex row gap-6 mt-4" >
                <label htmlFor="Tienda" className="cursor-pointer">
                  <input
                    id="Tienda"
                    name="preference"
                    type="radio"
                    value="Tienda"
                    checked={preference === 'Tienda'}
                    onChange={handlePreferenceChange}
                    className="hidden peer"
                  />
                  <div className="w-[100%] md:36 h-12 p-3 flex items-center justify-center border-2 border-gray-400 text-gray-600 rounded-md peer-checked:border-gray-900 peer-checked:text-gray-900">
                    Retiro en Tienda
                  </div>
                </label>

                <label htmlFor="Envio" className="cursor-pointer">
                  <input
                    id="Envio"
                    name="preference"
                    type="radio"
                    value="Envio"
                    checked={preference === 'Envio'}
                    onChange={handlePreferenceChange}
                    className="hidden peer"
                  />
                  <div className="w-[100%] md:36 h-12 p-3 flex items-center justify-center border-2 border-gray-400 text-gray-600 rounded-md peer-checked:border-gray-900 peer-checked:text-gray-900">
                    Envío Nacional
                  </div>
                </label>
              </div>


              {/* Condicional: Mostrar campo de dirección solo si "Envío Nacional" está seleccionado */}
              {preference === 'Envio' && (
                <div className="mt-4 w-[100%] md:w-80">
                  <label className="block text-sm font-medium leading-6 text-white-900 overflow-wrap-break-word">
                    Por favor ingrese,<br></br> la dirección de la agencia Zoom de su preferencia.
                  </label>
                  <input
                    type="text"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    className="block w-[100%] mt-2 bg-transparent p-3 rounded-md border-1 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                    placeholder="Dirección de la agencia Zoom"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between content-center items-center">
            <div className='pt-3'>
              <label>{step} / 3</label>
            </div>
            <button
              style={{ width: '8rem' }}
              onClick={handleSubmit(onSubmitFormOne)}
              className="rounded-md flex justify-center items-center mt-4 bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
            >
              Siguiente
            </button>
          </div>
        </form>
      )}
      {/* Payment Info */}
      {step === 2 && (
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">Pago.</h2>
        <form onSubmit={handleSubmit(addPayment)} className="flex md:flex-row flex-col gap-8">
          {/* Selección de moneda */}
          <div className="flex flex-col gap-4">
            <div className="flex row gap-6 pt-2">
              {Object.keys(paymentMethods).map((currency) => (
                <label htmlFor={currency} key={currency} className="cursor-pointer">
                  <input
                    id={currency}
                    name="currency"
                    type="radio"
                    value={currency}
                    checked={selectedCurrency === currency}
                    onChange={handleCurrencyChange}
                    className="hidden peer"
                    required
                  />
                  <div className="w-30 md:w-36 h-8 flex items-center justify-center border-2 border-gray-400 text-gray-600 rounded-md peer-checked:border-gray-900 peer-checked:text-gray-900">
                    {currency}
                  </div>
                </label>
              ))}
            </div>


            {/* Mostrar los métodos de pago según la moneda seleccionada */}
            {methodsForCurrency.length > 0 && (
              <div>
                <div className="flex row gap-6 mt-2">
                  {methodsForCurrency.map((method) => (
                    <label htmlFor={method.name} key={method.id} className="cursor-pointer">
                      <input
                        id={method.name}
                        name="preferencePayment"
                        type="radio"
                        value={method.name}
                        checked={preferencePayment?.name === method.name}
                        onChange={handlePreferencePaymentChange}
                        className="hidden peer"
                        required
                      />
                      <div className="w-30 md:w-36 h-8 flex items-center justify-center border-2 border-gray-400 text-gray-600 rounded-md peer-checked:border-gray-900 peer-checked:text-gray-900">
                        {method.name}
                      </div>
                    </label>
                  ))}
                </div>
                {/* Mostrar detalles del método de pago seleccionado */}
                {preferencePayment && (
                  <div className="mt-4 flex flex-col md:flex-row items-center md:items-start bg-white p-4 shadow-lg rounded-lg border border-gray-200 w-full max-w-md md:max-w-lg">
                    {/* Contenedor del QR */}
                    <div className="w-32 h-24 flex items-center justify-center rounded-lg overflow-hidden md-border md-border-gray-300">
                      {preferencePayment.qr_image && preferencePayment.qr_image !== '[]' ? (
                        <div
                          style={{
                            width: '100px',
                            height: '100px',
                            backgroundImage: `url(${process.env.BASE_URL}/storage/${JSON.parse(preferencePayment.qr_image)[0]})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        ></div>
                      ) : (
                        <PhotoIcon className="h-12 w-12 text-gray-500" />
                      )}
                    </div>

                    {/* Contenedor de los datos */}
                    <div className="ml-4 flex flex-col text-gray-700 w-full">
                      <div className="text-sm font-medium">ID: <span className="font-semibold">{preferencePayment.dni}</span></div>
                      <div className="text-sm font-medium">Banco: <span className="font-semibold">{preferencePayment.bank}</span></div>
                      <div className="text-sm font-medium">Nombre del Beneficiario: <span className="font-semibold">{preferencePayment.admin_name}</span></div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Campos de referencia, monto, imagen y fecha */}
          {preferencePayment && (
            <div className="items-center">
                  {totalPayments < totalAmount ? (
                    <>
              <p className="text-sm leading-6 text-white-600">Ingrese Referencias de pago.</p>
              <div className="flex gap-5 md:flex-row flex-col">
                <div className="w-[16rem]">
                  <input
                    {...register("payID")}
                    style={{ height: '2.5rem' }}
                    required
                    type="number"
                    placeholder="Referencia (últimos 6 números)"
                    className="block w-[100%] mt-4 bg-transparent p-3 rounded-md border-0 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                  <input
                    {...register("amount")}
                    style={{ height: '2.5rem' }}
                    required
                    type="number"
                    placeholder="Monto"
                    min="0" // Esto previene que se ingresen valores negativos
                    onInput={(e) => {
                      if (e.target.value < 0) {
                        e.target.value = 0; // Si el valor es negativo, lo cambia a 0
                      }
                    }}
                    className="block mt-4 w-[100%] bg-transparent p-3 rounded-md border-0 border-neutral-900 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                  <input
                    type="date"
                    {...register("paymentDate")}
                    name="paymentDate"
                    required
                    max={today} // Restringe fechas futuras
                    className="block mt-4 w-[93%] md:w-[100%] bg-transparent p-3 rounded-md border-1 md:border-0 py-1.5 text-gray-400 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              </>
              ) : (
                ''
              )}
              <div className="mt-6 flex items-center justify-between">
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
          )}

        </form>
        <div>
          {/* Mostrar pagos agregados */}
          {payments.length > 0 && (
            <div className='my-4'>
              <h3>Pagos agregados:</h3>
              <ul>
                {payments.map((payment, index) => {
                  const isBolivares = payment.method.currency.name === "Bolívares";
                  const amountInUsd = parseFloat(payment.amount);
                  const amountInBs = isBolivares ? (amountInUsd * dollarRate).toFixed(2) : payment.amount;
                  const currency = isBolivares ? "BS" : "USD";

                  return (
                    <li key={index}>
                      Método: {payment.method.name} - {payment.method.bank} - Referencia: {payment.reference} { }
                      {isBolivares ? (
                        <span>
                          - {amountInBs} {currency} / {amountInUsd} USD - { }
                        </span>
                      ) : (
                        <span>
                          - {amountInUsd} {currency} - { }
                        </span>
                      )}
                      Fecha: {payment.paymentDate}
                    </li>
                  );
                })}
              </ul>

              {/* Calcular el monto total */}
              <div className='flex gap-1'>
                <h4>Total Pagado: USD </h4>
                <p>
                  {payments.reduce((total, payment) => {
                    const amountInUsd = parseFloat(payment.amount);
                    return total + amountInUsd; // Sumar directamente si es USD
                  }, 0).toFixed(2)} 
                </p>
              </div>
              <div className='flex gap-1'>
                <h4>Resta: USD </h4>
                <p>
                  {totalAmount - totalPayments}
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="flex justify-between items-center">
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
                {loading ? (
                  <span>Loading...</span> // Mostrar "Loading..." cuando está en espera
                ) : (
                  'Crear Orden'
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    )}

      {step === 3 && (
        <form onSubmit={handleSubmit(onSubmitFormTwo)} className='text-center'>
          <div className='flex justify-center'>
            <div className="relative">
              {/* <Image
                className="h-50 w-50 object-cover"
                width={100}
                height={100}
                alt='hc'
                src="/infinityimg.png"
              /> */}
              <CheckCircleIcon
                className="h-25 mr-4 md:h-12 text-green-500 transition-all ease-in-out hover:scale-110"
              />
            </div>
          </div>
          <h2 className="text-base font-semibold leading-7 text-black">Tu orden ha sido procesada con éxito.
            Pronto validaremos los datos y luego recibirás un mensaje con la información de tu compra, el tiempo de entrega con Zoom dependerá de la zona geográfica de destino.</h2>
              <button
                style={{width: '6rem'}}
                type="submit"
                onClick={() => router.push('/')}
                className="mt-4 rounded-md bg-gray-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600"
              >
                Listo
              </button>
        </form>
      )}
      <WsMsg/>
    </div>
  );
}
