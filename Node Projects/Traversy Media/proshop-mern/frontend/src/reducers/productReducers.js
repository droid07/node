const initialState = {
  products: [],
  product: {},
  loading: false,
  error: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_LIST_REQUEST':
      return { loading: true, products: [] };
    case 'PRODUCT_LIST_SUCCESS':
      return { loading: false, products: action.payload };
    case 'PRODUCT_LIST_FAIL':
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const productDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PRODUCT_DETAILS_REQUEST':
      return { loading: true, product: {} };
    case 'PRODUCT_DETAILS_SUCCESS':
      return { loading: false, product: action.payload };
    case 'PRODUCT_DETAILS_FAIL':
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export { productReducer, productDetailReducer };
