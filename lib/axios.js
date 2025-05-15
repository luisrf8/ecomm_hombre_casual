import axios from 'axios';

// Verificar si API_URL está definido
const API_URL = process.env.BASE_URL || 'http://192.168.1.119:8000'; // Valor predeterminado si no está definido
const API_TOKEN = process.env.API_TOKEN;

if (!API_URL) {
  throw new Error('API_URL no está definido. Asegúrate de configurarlo en tus variables de entorno.');
}

// Crear instancia de Axios
const createApi = () => {
  const headers = {
    "Content-Type": "application/json",
  };

  if (API_TOKEN) {
    headers.Authorization = `Bearer ${API_TOKEN}`;
  }

  return axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers,
  });
};

const api = createApi();

export default api;
