import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { Product } from '../../types';
import { getWishlistStorage, setWishlistStorage } from '../../utils/storage';

interface WishlistState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
}

const initialState: WishlistState = {
  items: getWishlistStorage<Product[]>([]),
  isLoading: false,
  error: null,
};

export const fetchWishlist = createAsyncThunk('wishlist/fetch', async (_, { getState }) => {
  const state = getState() as { wishlist: WishlistState };
  return state.wishlist.items;
});

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const exists = state.items.find((p) => p.id === product.id);
      if (exists) state.items = state.items.filter((p) => p.id !== product.id);
      else state.items.push(product);
      setWishlistStorage(state.items);
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((p) => p.id !== action.payload);
      setWishlistStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      setWishlistStorage([]);
    },
  },
});

export const { toggleWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export const selectWishlistCount = (state: { wishlist: WishlistState }) => state.wishlist.items.length;
export default wishlistSlice.reducer;
