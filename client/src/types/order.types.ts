import { CartItem } from './cart.types';
import { OrderStatus, PaymentMethod } from '../config/constants';

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
}

export interface Order {
  _id: string;
  id: string;
  userId: string | null;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  status: OrderStatus;
  paymentMethod: PaymentMethod | string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderPayload {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
}
