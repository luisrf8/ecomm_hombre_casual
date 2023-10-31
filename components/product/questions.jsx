'use client';
export function Questions() {

  return (
    <>
      <div className="relative w-full overflow-hidden">
        <p className="text-lg font-semibold flex items-center">Preguntas y Respuestas</p>
        <p className="text-md font-semibold flex items-center mt-10">Haz tu pregunta aquí</p>
        <form className="w-max-[550px] relative w-full lg:w-80 xl:w-full md:inline-flex">
            <input
                type="text"
                name="search"
                autoComplete="off"
                style={{ border: '1px solid #BABABA'}}
                className="md:w-[80%] w-full  border md:rounded-l rounded-md bg-white px-4 py-4 text-sm text-black placeholder:text-neutral-800"
            />
            <button className="md:w-[20%] w-full bg-blue-900 hover:bg-gray-400 text-gray-100 py-2 md:rounded-r rounded-md">
                Enviar Respuesta
            </button>
        </form>
        <p className="text-xs font-semibold flex items-center mt-2">Sólo puede escribir 500 caracteres</p>
        <p className="text-md flex items-center mt-10">Nadie ha hecho ninguna pregunte por el momento. ¡Sé tu el primero!</p>
      </div>
    </>
  );
}
