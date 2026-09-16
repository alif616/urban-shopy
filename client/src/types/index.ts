export * from './product.types';
export * from './cart.types';
export * from './order.types';
export * from './user.types';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

export interface ApiError {
  message: string;
  status?: number;
  errors?: Record<string, string>;
}
