import Axios from 'axios';
import { getToken } from "./auth";

const api = Axios.create({ baseURL: 'https://magna-backend.herokuapp.com' });

api.interceptors.request.use(async config => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

export default api;