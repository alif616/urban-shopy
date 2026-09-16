import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { orderService } from '../../services/orderService';
import type { Order, CreateOrderPayload } from '../../types';
import { getStorage, setStorage } from '../../utils/storage';

const ORDERS_STORAGE_KEY = 'urban_shopy_orders';

interface OrdersState {
  items: Order[];
  currentOrder: Order | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: OrdersState = {
  items: getStorage<Order[]>(ORDERS_STORAGE_KEY, []),
  currentOrder: null,
  isLoading: false,
  error: null,
};

export const createOrder = createAsyncThunk('orders/create', async (payload: CreateOrderPayload) => {
  try {
    return await orderService.create(payload);
  } catch {
    const localOrder: Order = {
      _id: 'local-' + Date.now(),
      id: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
      userId: null,
      items: payload.items.map((i) => ({
        productId: i.productId, name: i.name, price: i.price,
        image: i.image, size: i.size, color: i.color, quantity: i.quantity,
      })),
      subtotal: payload.subtotal, shipping: payload.shipping, total: payload.total,
      shippingAddress: payload.shippingAddress,
      status: 'Pending',
      paymentMethod: payload.paymentMethod,
      createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(),
    };
    return localOrder;
  }
});

export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async () => {
  try { return await orderService.getUserOrders(); }
  catch { return getStorage<Order[]>(ORDERS_STORAGE_KEY, []); }
});

export const fetchOrderById = createAsyncThunk('orders/fetchById', async (id: string, { rejectWithValue }) => {
  try { return await orderService.getById(id); }
  catch {
    const local = getStorage<Order[]>(ORDERS_STORAGE_KEY, []);
    const found = local.find((o) => o.id === id || o._id === id);
    if (found) return found;
    return rejectWithValue('Order not found');
  }
});

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    clearCurrentOrder: (state) => { state.currentOrder = null; },
    clearOrders: (state) => { state.items = []; setStorage(ORDERS_STORAGE_KEY, []); },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(createOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
        state.items = [action.payload, ...state.items];
        const existing = getStorage<Order[]>(ORDERS_STORAGE_KEY, []);
        setStorage(ORDERS_STORAGE_KEY, [action.payload, ...existing]);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to create order';
      });
    builder
      .addCase(fetchUserOrders.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchUserOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Failed to fetch orders';
      });
    builder
      .addCase(fetchOrderById.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(fetchOrderById.fulfilled, (state, action: PayloadAction<Order>) => {
        state.isLoading = false;
        state.currentOrder = action.payload;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Order not found';
      });
  },
});

export const { clearCurrentOrder, clearOrders } = ordersSlice.actions;
export default ordersSlice.reducer;
