import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { authService } from '../../services/authService';
import { getTokenStorage, setTokenStorage, removeTokenStorage, getUserStorage, setUserStorage, removeUserStorage } from '../../utils/storage';
import type { AuthState, LoginPayload, RegisterPayload, User } from '../../types';

const initialState: AuthState = {
  user: getUserStorage<User | null>(null),
  token: getTokenStorage(),
  isLoading: false,
  error: null,
};

export const loginUser = createAsyncThunk('auth/login', async (payload: LoginPayload, { rejectWithValue }) => {
  try { return await authService.login(payload); }
  catch (err: any) { return rejectWithValue(err?.message || 'Login failed'); }
});

export const registerUser = createAsyncThunk('auth/register', async (payload: RegisterPayload, { rejectWithValue }) => {
  try { return await authService.register(payload); }
  catch (err: any) { return rejectWithValue(err?.message || 'Registration failed'); }
});

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async (_, { rejectWithValue }) => {
  try { return await authService.fetchCurrentUser(); }
  catch (err: any) { return rejectWithValue(err?.message || 'Failed to fetch user'); }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.error = null;
      removeTokenStorage();
      removeUserStorage();
    },
    clearAuthError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        setTokenStorage(action.payload.token);
        setUserStorage(action.payload.user);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Login failed';
      });
    builder
      .addCase(registerUser.pending, (state) => { state.isLoading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        setTokenStorage(action.payload.token);
        setUserStorage(action.payload.user);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = (action.payload as string) || 'Registration failed';
      });
    builder
      .addCase(fetchCurrentUser.pending, (state) => { state.isLoading = true; })
      .addCase(fetchCurrentUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.isLoading = false;
        state.user = action.payload;
        setUserStorage(action.payload);
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false;
        state.user = null;
        state.token = null;
        removeTokenStorage();
        removeUserStorage();
      });
  },
});

export const { logout, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
