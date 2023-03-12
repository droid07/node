import axios from 'axios';

const orderCreate = (orderData) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_CREATE_REQUEST' });

    const {
      data: { createOrder },
    } = await axios.post('/api/orders', orderData, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'ORDER_CREATE_SUCCESS', payload: createOrder });
  } catch (error) {
    dispatch({
      type: 'ORDER_CREATE_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_DETAILS_REQUEST' });

    const {
      data: { order },
    } = await axios.get(`/api/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'ORDER_DETAILS_SUCCESS', payload: order });
  } catch (error) {
    dispatch({
      type: 'ORDER_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'ORDER_PAY_REQUEST' });

    const {
      data: { order },
    } = await axios.put(`/api/orders/${id}/pay`, paymentResult, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'ORDER_PAY_SUCCESS', payload: order });
  } catch (error) {
    dispatch({
      type: 'ORDER_PAY_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getMyOrderList = () => async (dispatch, getState) => {
  try {
    dispatch({ type: 'MY_ORDER_LIST_REQUEST' });

    const {
      data: { orders },
    } = await axios.get(`/api/orders/myorders`, {
      headers: {
        Authorization: `Bearer ${getState().userLogin.userInfo.user.token}`,
      },
    });
    dispatch({ type: 'MY_ORDER_LIST_SUCCESS', payload: orders });
  } catch (error) {
    dispatch({
      type: 'MY_ORDER_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { orderCreate, getOrderDetails, payOrder, getMyOrderList };
