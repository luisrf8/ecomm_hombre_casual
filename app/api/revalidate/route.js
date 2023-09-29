const { NextResponse } = require('next/server');

exports.runtime = 'edge';

// Función de simulación de revalidación
function simulateRevalidate() {
  // Lógica de revalidación simulada aquí
  // Por ejemplo, puedes devolver una respuesta con un encabezado de caché configurado
  const response = new NextResponse();
  response.headers.set('Cache-Control', 'max-age=3600'); // Cache válido por 1 hora
  return response;
}

exports.POST = async function () {
  return simulateRevalidate(); // Llama a la función de simulación en lugar de req
};
