export interface User {
  id: string;
  _id?: string;
  name: string;
  email: string;
  role?: 'user' | 'admin';
  createdAt?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
}

export interface LoginPayload { email: string; password: string; }
export interface RegisterPayload { name: string; email: string; password: string; }
export interface AuthResponse { user: User; token: string; }
