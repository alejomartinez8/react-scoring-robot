import { userTypes } from '../types/';

const initialState = {};

export const register = (state = initialState, action) => {
  switch (action.type) {
    case userTypes.REGISTER_REQUEST:
      return { registering: true };

    case userTypes.REGISTER_SUCCESS:
    case userTypes.REGISTER_FAIL:
      return {};

    default:
      return state;
  }
};
