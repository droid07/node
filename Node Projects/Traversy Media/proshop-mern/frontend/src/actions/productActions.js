import axios from 'axios';

const getProducts = () => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_LIST_REQUEST' });

    const {
      data: { products },
    } = await axios.get('/api/products');
    dispatch({ type: 'PRODUCT_LIST_SUCCESS', payload: products });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_LIST_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

const getProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'PRODUCT_DETAILS_REQUEST' });

    const {
      data: { product },
    } = await axios.get(`/api/products/${id}`);
    dispatch({ type: 'PRODUCT_DETAILS_SUCCESS', payload: product });
  } catch (error) {
    dispatch({
      type: 'PRODUCT_DETAILS_FAIL',
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export { getProducts, getProduct };
