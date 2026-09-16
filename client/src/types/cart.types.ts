export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock?: number;
}

export interface CartState {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  total: number;
  isLoading: boolean;
  error: string | null;
}

export interface AddToCartPayload {
  productId: string;
  name: string;
  price: number;
  image: string;
  size: string;
  color: string;
  quantity: number;
  stock?: number;
}
