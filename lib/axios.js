import axios from 'axios';

const createApi = () => {
  return axios.create({
    baseURL: "http://localhost:3008",
    timeout: 60000,
    // headers: {
    //   "Access-Control-Allow-Origin": process.env.API_URL,
    //   "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization",
    //   "Access-Control-Allow-Credentials": true,
    //   "Content-Type": "application/json",
    // //   Authorization: "Bearer ".concat(process.env.API_TOKEN),
    // },
  });
};

// const api = createApi(process.env.API_URL, process.env.API_TOKEN);
const api = createApi(process.env.API_URL);

export default api;