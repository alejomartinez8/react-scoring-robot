import { accountTypes } from '../types/account.types';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true
};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case accountTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
}
