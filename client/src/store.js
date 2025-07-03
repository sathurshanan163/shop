import { configureStore } from '@reduxjs/toolkit';
import { api_slice } from './slices/api';
import authReducer from './slices/auth';
import cartReducer from './slices/cart';

const store = configureStore({
  reducer: {
    [api_slice.reducerPath]: api_slice.reducer,
    auth: authReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api_slice.middleware),
  devTools: true,
});

export default store;
