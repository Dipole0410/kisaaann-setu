import axios from 'axios';

/**
 * Dev: Vite proxies /api → server (see vite.config.js). Production: set VITE_API_BASE to full origin or leave /api behind same host.
 */
const baseURL = import.meta.env.VITE_API_BASE ?? '/api';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
