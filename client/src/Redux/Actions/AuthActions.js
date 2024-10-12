import axios from 'axios';

// Register User
export const register = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/register', formData);
    dispatch({ type: 'REGISTER_SUCCESS', payload: res.data });
  } catch (err) {
    // Handle error
  }
};

// Login User
export const login = (formData) => async dispatch => {
  try {
    const res = await axios.post('/api/auth/login', formData);
    dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
  } catch (err) {
    // Handle error
  }
};
