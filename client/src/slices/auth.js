import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user_info: localStorage.getItem('user_info')
    ? JSON.parse(localStorage.getItem('user_info'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
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

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
