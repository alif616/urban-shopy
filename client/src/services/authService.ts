import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import type { LoginPayload, RegisterPayload, AuthResponse, User } from '../types';

export const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => api.post<AuthResponse>(API_ENDPOINTS.AUTH_LOGIN, payload),
  register: async (payload: RegisterPayload): Promise<AuthResponse> => api.post<AuthResponse>(API_ENDPOINTS.AUTH_REGISTER, payload),
  fetchCurrentUser: async (): Promise<User> => api.get<User>(API_ENDPOINTS.AUTH_ME),
};

export default authService;
