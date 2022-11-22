import axios from 'axios';
import useAuth from 'src/composables/useAuth';

import { AuthResponse } from './../interfaces/auth.interface';

console.log(import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const data = JSON.parse(sessionStorage.getItem('auth') || 'null');

  if (data) config.headers = { Authorization: `Bearer ${data.token}` };

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401) useAuth().logout();

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { data } = await api.get<AuthResponse>('/auth/refresh-token');
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      useAuth().setAuthData(data);
      return api(originalRequest);
    }
    return Promise.reject(error);
  }
);

export { api };
