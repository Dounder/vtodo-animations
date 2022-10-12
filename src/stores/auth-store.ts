import { defineStore } from 'pinia';
import { AuthResponse, AuthState } from 'src/interfaces/auth.interface';

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    id: null,
    email: null,
    token: null,
    error: null,
  }),
  getters: {
    user: (state) => ({ id: state.id, email: state.email }),
    getError: (state) => ({
      hasError: !!state.error,
      msg: state.error?.message,
    }),
    isAuthenticated: (state) => !!state.token,
  },
  actions: {
    setAuthData({ email, id, token }: AuthResponse) {
      this.id = id;
      this.email = email;
      this.token = token;
      sessionStorage.setItem('auth', JSON.stringify({ email, id, token }));
    },
    refreshAuthData() {
      const data = JSON.parse(sessionStorage.getItem('auth') ?? 'null');
      if (data) this.setAuthData(data);
    },
    refreshToken({ email, id, token }: AuthResponse) {
      this.setAuthData({ email, id, token });
    },
    setError(payload = null) {
      this.error = payload;
    },
    logout() {
      this.id = null;
      this.email = null;
      this.token = null;
      this.error = null;
      sessionStorage.clear();
    },
  },
});
