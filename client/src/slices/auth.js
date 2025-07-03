import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_info: localStorage.getItem('user_info')
    ? JSON.parse(localStorage.getItem('user_info'))
    : null,
};

const auth_slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    set_credentials: (state, action) => {
      state.user_info = action.payload;
      localStorage.setItem('user_info', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.user_info = null;
      localStorage.clear();
      document.location.href = '/login';
    },
  },
});

export const { set_credentials, logout } = auth_slice.actions;
export default auth_slice.reducer;
