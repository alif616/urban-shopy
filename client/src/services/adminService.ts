import { api } from './api';
import { API_BASE_URL } from '../config/api';
import type { Product, Order, User } from '../types';

const ADMIN = API_BASE_URL + '/admin';

export interface DashboardStats {
  totalProducts: number;
  totalOrders: number;
  totalUsers: number;
  pendingOrders: number;
  totalRevenue: number;
  recentOrders: Order[];
}

export const adminService = {
  getStats: async (): Promise<DashboardStats> => api.get<DashboardStats>(ADMIN + '/stats'),
  listProducts: async (): Promise<Product[]> => api.get<Product[]>(ADMIN + '/products'),
  createProduct: async (payload: Partial<Product>): Promise<Product> =>
    api.post<Product>(ADMIN + '/products', payload),
  updateProduct: async (id: string, payload: Partial<Product>): Promise<Product> =>
    api.put<Product>(ADMIN + '/products/' + id, payload),
  deleteProduct: async (id: string): Promise<{ id: string }> =>
    api.delete<{ id: string }>(ADMIN + '/products/' + id),
  listOrders: async (): Promise<Order[]> => api.get<Order[]>(ADMIN + '/orders'),
  updateOrderStatus: async (id: string, status: string): Promise<Order> =>
    api.patch<Order>(ADMIN + '/orders/' + id + '/status', { status }),
  listUsers: async (): Promise<User[]> => api.get<User[]>(ADMIN + '/users'),
};

export default adminService;