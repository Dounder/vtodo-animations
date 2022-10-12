import axios, { AxiosInstance } from 'axios';
import { boot } from 'quasar/wrappers';
import useAuth from 'src/composables/useAuth';

import { AuthResponse } from './../interfaces/auth.interface';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const api = axios.create({
  baseURL: 'https://dcode-todo.herokuapp.com/api/v1',
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

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export { api };
