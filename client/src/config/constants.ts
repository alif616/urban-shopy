export const APP_NAME = 'Urban Shopy';
export const APP_TAGLINE = 'Style for Everyday Life.';
export const APP_HERO_HEADLINE = 'Everyday Style. Reimagined.';
export const APP_HERO_SUBTEXT = 'Discover thoughtfully selected essentials designed for modern urban living.';

export const API_BASE_URL = (import.meta as any).env?.VITE_API_URL || 'http://localhost:5000/api';

export const STORAGE_KEYS = {
  CART: 'urban_shopy_cart',
  WISHLIST: 'urban_shopy_wishlist',
  TOKEN: 'urban_shopy_token',
  USER: 'urban_shopy_user',
} as const;

export const FREE_SHIPPING_THRESHOLD = 150;
export const DEFAULT_SHIPPING_COST = 15;

export const CATEGORIES = ['All', 'Men', 'Women', 'Footwear', 'Accessories'] as const;
export type Category = (typeof CATEGORIES)[number];

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Highest Rated' },
] as const;
export type SortOption = (typeof SORT_OPTIONS)[number]['value'];

export const MIN_PRICE = 0;
export const MAX_PRICE = 500;
export const DEFAULT_MAX_PRICE = 200;

export const ORDER_STATUSES = ['Pending', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'] as const;
export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const PAYMENT_METHODS = [
  { value: 'cod', label: 'Cash on Delivery (COD)' },
  { value: 'card', label: 'Credit Card (Demo Mode)' },
] as const;
export type PaymentMethod = (typeof PAYMENT_METHODS)[number]['value'];

export const TOAST_DURATION = 3000;
export const MIN_PASSWORD_LENGTH = 6;

export const COUNTRIES = [
  'United States', 'United Kingdom', 'Canada', 'Australia',
  'Germany', 'France', 'Bangladesh', 'India', 'Japan', 'Other',
] as const;
