import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { productService } from '../../services/productService';
import { DEMO_PRODUCTS } from '../../data/products';
import type { Product, ProductFilters } from '../../types';

interface ProductsState {
  items: Product[];
  currentProduct: Product | null;
  isLoading: boolean;
  error: string | null;
  filters: ProductFilters;
}

const initialState: ProductsState = {
  items: [],
  currentProduct: null,
  isLoading: false,
  error: null,
  filters: {},
};

export const fetchProducts = createAsyncThunk('products/fetchAll', async (filters: ProductFilters | undefined) => {
  try {
    const data = await productService.getAll(filters);
    return data.products;
  } catch {
    console.warn('[products] Backend unavailable, using demo products.');
    return DEMO_PRODUCTS;
  }
});

export const fetchProductBySlug = createAsyncThunk('products/fetchBySlug', async (slug: string, { rejectWithValue }) => {
  try { return await productService.getBySlug(slug); }
  catch {
    const fallback = DEMO_PRODUCTS.find((p) => p.slug === slug);
    if (fallback) return fallback;
    return rejectWithValue('Product not found');
  }
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    clearCurrentProduct: (state) => { state.currentProduct = null; },
    setFilters: (state, action: PayloadAction<ProductFilters>) => { state.filters = action.payload; },
    clearFilters: (state) => { state.filters = {}; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch products';
      });
    builder
      .addCase(fetchProductBySlug.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchProductBySlug.fulfilled, (state, action: PayloadAction<Product>) => {
        state.isLoading = false;
        state.currentProduct = action.payload;
      })
      .addCase(fetchProductBySlug.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Product not found';
      });
  },
});

export const { clearCurrentProduct, setFilters, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
