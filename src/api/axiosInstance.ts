import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

axiosInstance.interceptors.request.use((config) => {
  if (JWT_TOKEN) {
    config.headers.Authorization = `Bearer ${JWT_TOKEN}`;
  }
  return config;
});

export default axiosInstance;
