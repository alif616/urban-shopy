import { api } from './api';
import { API_ENDPOINTS } from '../config/api';
import type { Product, ProductFilters, ProductsResponse } from '../types';
import { buildQueryString } from '../utils/helpers';

export const productService = {
  getAll: async (filters?: ProductFilters): Promise<ProductsResponse> => {
    const qs = filters ? buildQueryString(filters as any) : '';
    return api.get<ProductsResponse>(API_ENDPOINTS.PRODUCTS + qs);
  },
  getFeatured: async (): Promise<Product[]> => api.get<Product[]>(API_ENDPOINTS.PRODUCT_FEATURED),
  getNewArrivals: async (): Promise<Product[]> => api.get<Product[]>(API_ENDPOINTS.PRODUCT_NEW_ARRIVALS),
  getBySlug: async (slug: string): Promise<Product> => api.get<Product>(API_ENDPOINTS.PRODUCT_BY_SLUG(slug)),
};

export default productService;
