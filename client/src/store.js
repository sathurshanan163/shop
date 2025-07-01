import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/api';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    cart: cartReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
