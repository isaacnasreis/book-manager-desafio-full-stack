import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import toast from 'react-hot-toast';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  reqId?: string;
  slowRequestTimeout?: ReturnType<typeof setTimeout>;
}

api.interceptors.request.use((config: CustomAxiosRequestConfig) => {
  const token = localStorage.getItem('@BookManager:token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const reqId = Math.random().toString(36).substring(7);
  config.reqId = reqId;

  config.slowRequestTimeout = setTimeout(() => {
    toast('Acordando o servidor... Isso pode levar alguns segundos na primeira vez. ☕', {
      id: `slow-req-${reqId}`,
      duration: 6000,
      icon: '⏳',
      style: {
        background: '#0f172a',
        color: '#fff',
        border: '1px solid rgba(6, 182, 212, 0.2)',
      }
    });
  }, 3000);

  return config;
});

api.interceptors.response.use(
  (response) => {
    const config = response.config as CustomAxiosRequestConfig;

    if (config.slowRequestTimeout) {
      clearTimeout(config.slowRequestTimeout);
    }
    if (config.reqId) {
      toast.dismiss(`slow-req-${config.reqId}`);
    }

    return response;
  },
  (error) => {
    const config = error.config as CustomAxiosRequestConfig | undefined;

    if (config?.slowRequestTimeout) {
      clearTimeout(config.slowRequestTimeout);
    }
    if (config?.reqId) {
      toast.dismiss(`slow-req-${config.reqId}`);
    }

    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('@BookManager:token');
      delete api.defaults.headers.common['Authorization'];

      const publicPaths = ['/login', '/register'];
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);