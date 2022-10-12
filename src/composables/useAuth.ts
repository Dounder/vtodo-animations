import axios from 'axios';
import { storeToRefs } from 'pinia';
import { api } from 'src/boot/axios';
import { AuthResponse } from 'src/interfaces/auth.interface';
import { useAuthStore } from 'src/stores/auth-store';
import { ref } from 'vue';

const useAuth = () => {
  //? Properties
  const isLoading = ref(false);
  const store = useAuthStore();
  const { user, token, getError, isAuthenticated } = storeToRefs(store);

  //! Actions
  const login = async (form: { email: string; password: string }) => {
    try {
      isLoading.value = true;
      const { data } = await api.post<AuthResponse>('/auth/login', form);
      store.setAuthData(data);
      store.setError();
      isLoading.value = false;
    } catch (error) {
      if (!axios.isAxiosError(error)) return console.log(error);

      store.setError(error.response?.data);
      isLoading.value = false;
    }
  };

  //! Actions
  const register = async (form: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      isLoading.value = true;
      const { data } = await api.post<AuthResponse>('/auth/register', form);
      store.setAuthData(data);
      store.setError();
      console.log(data);
      isLoading.value = false;
    } catch (error) {
      if (!axios.isAxiosError(error)) return console.log(error);

      store.setError(error.response?.data);
      isLoading.value = false;
    }
  };

  return {
    //? Properties
    isLoading: isLoading.value,
    user: user.value,
    token: token.value,
    error: getError,
    isAuthenticated: isAuthenticated.value,

    //! Actions
    login,
    register,
    refreshData: store.refreshAuthData,
    setAuthData: store.setAuthData,
    logout: store.logout,
  };
};

export default useAuth;
