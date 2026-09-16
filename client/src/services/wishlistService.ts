import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import type { Product } from '../types';

export const wishlistService = {
  get: async (): Promise<Product[]> => api.get<Product[]>(API_ENDPOINTS.WISHLIST),
  add: async (productId: string): Promise<Product[]> => api.post<Product[]>(API_ENDPOINTS.WISHLIST, { productId }),
  remove: async (productId: string): Promise<Product[]> => api.delete<Product[]>(API_ENDPOINTS.WISHLIST_ITEM(productId)),
};

export default wishlistService;
