import { userTypes } from '../types/user.types';

const initialState = {
  user: null,
  isAuth: false
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case userTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuth: true
      };
    case userTypes.LOGIN_FAIL:
    case userTypes.LOGOUT:
      return {
        user: null,
        isAuth: false
      };
    default:
      return state;
  }
}
