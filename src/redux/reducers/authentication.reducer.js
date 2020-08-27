import { accountTypes } from '../types/account.types';

const initialState = {
  user: JSON.parse(localStorage.getItem('user')),
  isAuthenticated: null,
  loading: true
};

export function authentication(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case accountTypes.LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false
      };
    default:
      return state;
  }
}
