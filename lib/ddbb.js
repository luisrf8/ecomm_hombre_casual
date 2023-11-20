import api from './axios';

let products = [];

const fetchProducts = async () => {
  try {
    const response = await api.get("/articles");
    return response.data;
  } catch (error) {
    console.error("Hubo un error al obtener los productos:", error);
    throw error; // Puedes manejar el error o lanzarlo para manejarlo en otro lugar
  }
};

// Llama a la función para obtener los productos y luego maneja los resultados
fetchProducts()
  .then(data => {
    products = data;
  })
  .catch(error => {
    // Manejar errores aquí si es necesario
  });

export { fetchProducts, products }; // También exporta la función fetchProducts

