import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const apiAuth : AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiAuth.interceptors.request.use( (config: InternalAxiosRequestConfig)=> {
     const token = localStorage.getItem("token");


  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config
});
export default apiAuth;
