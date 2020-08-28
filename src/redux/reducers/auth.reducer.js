import { accountTypes } from '../types/account.types';

const initialState = {
  user: null,
  isAuth: false
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case accountTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuth: true
      };
    case accountTypes.LOGIN_FAIL:
    case accountTypes.LOGOUT:
      return {
        user: null,
        isAuth: false
      };
    default:
      return state;
  }
}
