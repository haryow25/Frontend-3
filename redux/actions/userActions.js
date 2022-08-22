import axios from 'axios';

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_RESET,
  UPDATE_PROFILE_FAIL,
  CLEAR_ERRORS,
} from '../constants/userConstants';

const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
// Register user
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${apiUrl}/register`, userData, config);

    setTimeout(() => {
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: data.message,
      });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response.data.error,
      });
    }, 1000);
  }
};

export const loginUser = (loginData) => async (dispatch) => {
  try {
    dispatch({
      type: LOGIN_USER_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post(`${apiUrl}/login`, loginData, config);

    localStorage.setItem('accessToken', data.data.accessToken);

    setTimeout(() => {
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: data.message,
      });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: error.response.data.message,
      });
    }, 1000);
  }
};

// loadUser
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });
    const config = {
      headers: {
        authorization: `${localStorage.getItem('accessToken')}`,
      },
    };
    const result = await axios.get(`${apiUrl}/me`, config);
    dispatch({ type: LOAD_USER_SUCCESS, payload: result.data.user });
  } catch (error) {
    dispatch({
      type: LOAD_USER_FAIL,
      payload: error.response,
    });
  }
};

export const updateUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        authorization: `${localStorage.getItem('accessToken')}`,
      },
    };
    const result = await axios.put(
      `${apiUrl}/user/me/update`,
      userData,
      config
    );

    setTimeout(() => {
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: result.data.message });
    }, 1000);
  } catch (error) {
    setTimeout(() => {
      dispatch({
        type: UPDATE_PROFILE_FAIL,
        payload: error.response.data.error,
      });
    }, 1000);
  }
};

// Clear Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
