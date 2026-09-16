import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import type { Order, CreateOrderPayload } from '../types';

export const orderService = {
  create: async (payload: CreateOrderPayload): Promise<Order> => api.post<Order>(API_ENDPOINTS.ORDERS, payload),
  getUserOrders: async (): Promise<Order[]> => api.get<Order[]>(API_ENDPOINTS.ORDERS),
  getById: async (id: string): Promise<Order> => api.get<Order>(API_ENDPOINTS.ORDER_BY_ID(id)),
};

export default orderService;
