import axios from 'axios';

const addToCart = (id, qty) => async (dispatch, getState) => {
  const {
    data: { product },
  } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: 'ADD_TO_CART',
    payload: {
      product: product?._id,
      name: product?.name,
      image: product?.image,
      price: product?.price,
      countInStock: product?.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({ type: 'REMOVE_ITEMS_FROM_CART', payload: id });
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: 'SAVE_SHIPPING_ADDRESS', payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: data });
  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export { addToCart, removeFromCart, saveShippingAddress, savePaymentMethod };
