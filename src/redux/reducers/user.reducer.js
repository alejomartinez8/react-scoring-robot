import { UserTypes } from "../constants/UserTypes";

const initialState = {
  loading: false,
  user: {},
  users: [],
  error: [],
};

export function user(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UserTypes.GET_USER:
    case UserTypes.GET_USERS:
      return {
        ...state,
        loading: true,
      };

    case UserTypes.USERS_LOADED:
      return {
        ...state,
        loading: false,
        users: payload,
      };

    case UserTypes.USER_LOADED:
      return {
        ...state,
        loading: false,
        user: payload,
      };

    case UserTypes.USER_DELETE:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === payload ? { ...user, deleting: true } : user
        ),
      };

    case UserTypes.CLEAR_USER:
      return {
        ...state,
        loading: false,
        user: {},
        users: [],
      };

    case UserTypes.USER_ERROR:
      return {
        ...state,
        loading: false,
        user: {},
        users: [],
        error: payload,
      };

    default:
      return state;
  }
}
