import { userTypes } from '../types/user.types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: false,
  user: null
};

export function auth(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case userTypes.AUTH_REQUEST:
      return {
        ...state,
        loading: true
      };

    case userTypes.USER_LOADED:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload
      };
    case userTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        loading: false
      };
    case userTypes.AUTH_ERROR:
    case userTypes.LOGIN_FAIL:
    case userTypes.REGISTER_FAIL:
    case userTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false
      };

    case userTypes.AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
