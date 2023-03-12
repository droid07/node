const orderCreateReducer = (state = { order: {}, success: false }, action) => {
  switch (action.type) {
    case 'ORDER_CREATE_REQUEST':
      return { loading: true };
    case 'ORDER_CREATE_SUCCESS':
      return { loading: false, success: true, order: action.payload };
    case 'ORDER_CREATE_FAIL':
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const orderDetailsReducer = (
  state = { loading: true, order: null },
  action
) => {
  switch (action.type) {
    case 'ORDER_DETAILS_REQUEST':
      return { ...state, loading: true };
    case 'ORDER_DETAILS_SUCCESS':
      return { loading: false, success: true, order: action.payload };
    case 'ORDER_DETAILS_FAIL':
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

const orderPayReducer = (
  state = { loading: false, success: false },
  action
) => {
  switch (action.type) {
    case 'ORDER_PAY_REQUEST':
      return { loading: true };
    case 'ORDER_PAY_SUCCESS':
      return { loading: false, success: true };
    case 'ORDER_PAY_FAIL':
      return { loading: false, error: action.payload };
    case 'ORDER_PAY_RESET':
      return {};

    default:
      return state;
  }
};

const orderListMyReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case 'MY_ORDER_LIST_REQUEST':
      return { loading: true };
    case 'MY_ORDER_LIST_SUCCESS':
      return { loading: false, orders: action.payload };
    case 'MY_ORDER_LIST_FAIL':
      return { loading: false, error: action.payload };
    case 'MY_ORDER_LIST_RESET':
      return { loading: false, orders: [] };

    default:
      return state;
  }
};

export {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
};
