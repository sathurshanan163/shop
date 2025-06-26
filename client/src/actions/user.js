import axios from 'axios';
import {
  LOGIN_REQUEST,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  PROFILE_SUCCESS,
  PROFILE_FAIL,
  PROFILE_RESET,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PROFILE_REQUEST,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
} from '../constants/user';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem('user_info', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      '/api/users/register',
      { name, email, password },
      config
    );
    dispatch({ type: REGISTER_SUCCESS, payload: data });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem('user_info', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('user_info');
  dispatch({ type: LOGOUT });
  dispatch({ type: PROFILE_RESET });
  document.location.href = '/login';
};

export const profile = () => async (dispatch, getState) => {
  try {
    dispatch({ type: PROFILE_REQUEST });
    const {
      user_login: { user_info },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user_info.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/profile`, config);
    dispatch({ type: PROFILE_SUCCESS, payload: data });
  } catch (error) {
    const msg = dispatch({ type: PROFILE_RESET });
    if (msg === 'Not authorized, token failed') {
      dispatch(logout());
      dispatch({ type: PROFILE_FAIL, payload: msg });
    }
  }
};

export const update_profile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const {
      user_login: { user_info },
    } = getState();
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user_info.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);
    dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: LOGIN_SUCCESS, payload: data });
    localStorage.setItem('user_info', JSON.stringify(data));
  } catch (error) {
    const msg =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (msg === 'Not authorized, token failed') {
      dispatch(logout());
      dispatch({ type: UPDATE_PROFILE_FAIL, payload: msg });
    }
  }
};
