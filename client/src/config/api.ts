import { API_BASE_URL } from './constants';

export const API_ENDPOINTS = {
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_ME: `${API_BASE_URL}/auth/me`,
  PRODUCTS: `${API_BASE_URL}/products`,
  PRODUCT_FEATURED: `${API_BASE_URL}/products/featured`,
  PRODUCT_NEW_ARRIVALS: `${API_BASE_URL}/products/new-arrivals`,
  PRODUCT_BY_SLUG: (slug: string) => `${API_BASE_URL}/products/${slug}`,
  ORDERS: `${API_BASE_URL}/orders`,
  ORDER_BY_ID: (id: string) => `${API_BASE_URL}/orders/${id}`,
  WISHLIST: `${API_BASE_URL}/wishlist`,
  WISHLIST_ITEM: (productId: string) => `${API_BASE_URL}/wishlist/${productId}`,
};

export const API_HEADERS = { 'Content-Type': 'application/json' };
export const REQUEST_TIMEOUT = 15000;
export { API_BASE_URL };
