import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, AddToCartPayload } from '../../types';
import { getCartStorage, setCartStorage } from '../../utils/storage';
import { FREE_SHIPPING_THRESHOLD, DEFAULT_SHIPPING_COST } from '../../config/constants';

interface CartState {
  items: CartItem[];
  isLoading: boolean;
  error: string | null;
}

const initialState: CartState = {
  items: getCartStorage<CartItem[]>([]),
  isLoading: false,
  error: null,
};

const buildItemId = (productId: string, size: string, color: string) =>
  productId + '__' + size + '__' + color;

export const fetchCart = createAsyncThunk('cart/fetch', async (_, { getState }) => {
  const state = getState() as { cart: CartState };
  return state.cart.items;
});

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const p = action.payload;
      const id = buildItemId(p.productId, p.size, p.color);
      const existing = state.items.find((i) => i.id === id);
      if (existing) {
        existing.quantity = Math.min(existing.quantity + p.quantity, p.stock ?? 99);
      } else {
        state.items.push({
          id, productId: p.productId, name: p.name, price: p.price,
          image: p.image, size: p.size, color: p.color, quantity: p.quantity, stock: p.stock,
        });
      }
      setCartStorage(state.items);
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; delta: number }>) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (!item) return;
      const next = item.quantity + action.payload.delta;
      item.quantity = Math.max(1, Math.min(next, item.stock ?? 99));
      setCartStorage(state.items);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
      setCartStorage(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      setCartStorage([]);
    },
    setCartItems: (state, action: PayloadAction<CartItem[]>) => {
      state.items = action.payload;
      setCartStorage(state.items);
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart, setCartItems } = cartSlice.actions;

export const selectCartSubtotal = (state: { cart: CartState }) =>
  state.cart.items.reduce((s, i) => s + i.price * i.quantity, 0);
export const selectCartCount = (state: { cart: CartState }) =>
  state.cart.items.reduce((s, i) => s + i.quantity, 0);
export const selectCartShipping = (state: { cart: CartState }) => {
  const sub = selectCartSubtotal(state);
  if (sub === 0) return 0;
  return sub >= FREE_SHIPPING_THRESHOLD ? 0 : DEFAULT_SHIPPING_COST;
};
export const selectCartTotal = (state: { cart: CartState }) =>
  selectCartSubtotal(state) + selectCartShipping(state);

export default cartSlice.reducer;
