import axios from 'axios';

const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_LOGIN_REQUEST' });
    const { data } = await axios.post('/api/auth/login', formData);
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const register = (formData) => async (dispatch) => {
  try {
    dispatch({ type: 'USER_REGISTER_REQUEST' });
    const { data } = await axios.post('/api/auth/register', formData);
    dispatch({ type: 'USER_REGISTER_SUCCESS', payload: data });
    dispatch({ type: 'USER_LOGIN_SUCCESS', payload: data });
    localStorage.setItem('userInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: 'USER_REGISTER_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_DETAILS_REQUEST' });
    const { data } = await axios.get(`/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'USER_DETAILS_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUserProfile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_UPDATE_PROFILE_REQUEST' });
    const { data } = await axios.put(`/api/auth/profile`, userData, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'USER_UPDATE_PROFILE_SUCCESS', payload: data });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_PROFILE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getUsersList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_LIST_REQUEST' });
    const {
      data: { users },
    } = await axios.get(`/api/users`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'USER_LIST_SUCCESS', payload: users });
  } catch (error) {
    dispatch({
      type: 'USER_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getUserListDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_LIST_DETAILS_REQUEST' });
    const {
      data: { user },
    } = await axios.get(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'USER_LIST_DETAILS_SUCCESS', payload: user });
  } catch (error) {
    dispatch({
      type: 'USER_LIST_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const updateUser = (id, userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'USER_UPDATE_REQUEST' });
    const {
      data: { user },
    } = await axios.put(`/api/users/${id}`, userData, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'USER_UPDATE_SUCCESS', payload: user });
  } catch (error) {
    dispatch({
      type: 'USER_UPDATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const deleteUser = (id) => async (dispatch, getState) => {
  try {
    await axios.delete(`/api/users/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'USER_DELETE_SUCCESS', payload: id });
  } catch (error) {
    dispatch({
      type: 'USER_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const userUpdateReset = () => (dispatch) => {
  dispatch({ type: 'USER_UPDATE_RESET' });
};

const logout = () => (dispatch) => {
  dispatch({ type: 'USER_LOGOUT' });
  dispatch({ type: 'USER_DETAILS_RESET' });
  dispatch({ type: 'MY_ORDER_LIST_RESET' });
  localStorage.removeItem('userInfo');
};

export {
  login,
  logout,
  register,
  getUserDetails,
  updateUserProfile,
  getUsersList,
  deleteUser,
  getUserListDetails,
  updateUser,
  userUpdateReset,
};
