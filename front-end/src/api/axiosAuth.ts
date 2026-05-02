import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const apiAuth: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

apiAuth.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiAuth.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      window.location.href = '/connexion';
    }
    return Promise.reject(error);
  },
);

export default apiAuth;
