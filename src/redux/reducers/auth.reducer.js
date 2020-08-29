import { userTypes } from '../types/user.types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: false,
  loading: true,
  user: null
};

export function auth(state = initialState, action) {
  const { type, payload } = action;
  console.log('auth.reducer action:', action);

  switch (type) {
    case userTypes.USER_LOADED:
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
        ...payload,
        isAuth: true,
        loading: false
      };
    case userTypes.LOGIN_FAIL:
    case userTypes.LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false
      };
    default:
      return state;
  }
}
