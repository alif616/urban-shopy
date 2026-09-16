import { API_BASE_URL, REQUEST_TIMEOUT } from '../config/api';
import { getTokenStorage, removeTokenStorage } from '../utils/storage';

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}

interface ServerEnvelope<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Record<string, string>;
}

const buildHeaders = (custom?: HeadersInit): HeadersInit => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(custom as Record<string, string> | undefined),
  };
  const token = getTokenStorage();
  if (token) headers['Authorization'] = 'Bearer ' + token;
  return headers;
};

const parseResponse = async <T>(response: Response): Promise<T> => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (response.status === 401) removeTokenStorage();
    const error: ApiError = {
      message: (isJson && (body as any)?.message) || ('Request failed with status ' + response.status),
      status: response.status,
      errors: isJson ? (body as any)?.errors : undefined,
    };
    throw error;
  }

  if (isJson && body && typeof body === 'object' && 'success' in body) {
    const envelope = body as ServerEnvelope<T>;
    if (envelope.data !== undefined) return envelope.data;
    return undefined as T;
  }

  return body as T;
};

const request = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);
  try {
    const response = await fetch(endpoint, {
      ...options,
      headers: buildHeaders(options.headers),
      signal: controller.signal,
    });
    return await parseResponse<T>(response);
  } catch (error: any) {
    if (error.name === 'AbortError') throw { message: 'Request timed out. Please try again.' } as ApiError;
    if (error.message && error.status === undefined) throw { message: error.message || 'Network error' } as ApiError;
    throw error;
  } finally {
    clearTimeout(timer);
  }
};

export const api = {
  get: <T>(endpoint: string, options: RequestInit = {}) => request<T>(endpoint, { ...options, method: 'GET' }),
  post: <T>(endpoint: string, body?: unknown, options: RequestInit = {}) =>
    request<T>(endpoint, { ...options, method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined }),
  put: <T>(endpoint: string, body?: unknown, options: RequestInit = {}) =>
    request<T>(endpoint, { ...options, method: 'PUT', body: body !== undefined ? JSON.stringify(body) : undefined }),
  patch: <T>(endpoint: string, body?: unknown, options: RequestInit = {}) =>
    request<T>(endpoint, { ...options, method: 'PATCH', body: body !== undefined ? JSON.stringify(body) : undefined }),
  delete: <T>(endpoint: string, options: RequestInit = {}) => request<T>(endpoint, { ...options, method: 'DELETE' }),
};

export default api;
export { API_BASE_URL };
