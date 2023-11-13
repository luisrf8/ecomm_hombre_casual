import axios from 'axios';

const API_URL = "http://194.163.146.5:3001"
const createApi = () => {
  return axios.create({
    baseURL: API_URL,
    timeout: 60000,
    headers: {
      "Access-Control-Allow-Origin": API_URL,
      "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json",
    //   Authorization: "Bearer ".concat(process.env.API_TOKEN),
    },
  });
};

// const api = createApi(process.env.API_URL, process.env.API_TOKEN);
const api = createApi(API_URL);

export default api;