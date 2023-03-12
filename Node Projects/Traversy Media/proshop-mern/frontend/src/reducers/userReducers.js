const userLoginReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case 'USER_LOGIN_REQUEST':
      return {
        ...state,
        loading: true,
        userInfo: null,
      };
    case 'USER_LOGIN_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case 'USER_LOGIN_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_LOGOUT':
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

const userRegisterReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case 'USER_REGISTER_REQUEST':
      return {
        ...state,
        loading: true,
        userInfo: null,
      };
    case 'USER_REGISTER_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
      };
    case 'USER_REGISTER_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_LOGOUT':
      return {
        userInfo: null,
      };
    default:
      return state;
  }
};

const userDetailsReducer = (state = { userDet: null }, action) => {
  switch (action.type) {
    case 'USER_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        userDet: null,
      };
    case 'USER_DETAILS_SUCCESS':
      return {
        ...state,
        loading: false,
        userDet: action.payload,
      };
    case 'USER_DETAILS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case 'USER_DETAILS_RESET':
      return {
        ...state,
        loading: false,
        userDet: {},
      };
    default:
      return state;
  }
};
const userUpdateReducer = (state = { userInfo: null }, action) => {
  switch (action.type) {
    case 'USER_UPDATE_PROFILE_REQUEST':
      return {
        ...state,
        loading: true,
        userDet: null,
      };
    case 'USER_UPDATE_PROFILE_SUCCESS':
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        success: true,
      };
    case 'USER_UPDATE_PROFILE_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case 'USER_LIST_REQUEST':
      return {
        loading: true,
        users: null,
      };
    case 'USER_LIST_SUCCESS':
      return {
        loading: false,
        users: action.payload,
      };
    case 'USER_DELETE_SUCCESS':
      return {
        loading: false,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    case 'USER_LIST_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const userListDetailsReducer = (state = { userDet: null }, action) => {
  switch (action.type) {
    case 'USER_LIST_DETAILS_REQUEST':
      return {
        ...state,
        loading: true,
        userDet: null,
      };
    case 'USER_LIST_DETAILS_SUCCESS':
      return {
        ...state,
        loading: false,
        userDet: action.payload,
      };
    case 'USER_LIST_DETAILS_FAIL':
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
const userAdminUpdateReducer = (state = { userInfo: {} }, action) => {
  switch (action.type) {
    case 'USER_UPDATE_REQUEST':
      return {
        loading: true,
      };
    case 'USER_UPDATE_SUCCESS':
      return {
        ...state,
        loading: false,
        success: true,
      };
    case 'USER_UPDATE_FAIL':
      return {
        loading: false,
        error: action.payload,
      };
    case 'USER_UPDATE_RESET':
      return {
        userInfo: {},
      };
    default:
      return state;
  }
};
export {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateReducer,
  userListReducer,
  userListDetailsReducer,
  userAdminUpdateReducer,
};
