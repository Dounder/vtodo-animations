export interface AuthState {
  id: string | null;
  email: string | null;
  token: string | null;
  error: AuthError | null;
}

export interface AuthResponse {
  id: string;
  email: string;
  token: string;
}

export interface AuthError {
  statusCode: number;
  message: string;
  error: string;
}
