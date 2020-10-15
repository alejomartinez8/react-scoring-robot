import { UserTypes } from "../constants/UserTypes";

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  loading: false,
  userAuth: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    institution: "",
    city: "",
    country: "",
  },
  error: [],
};

export function auth(state = initialState, action) {
  const { type, payload } = action;
  // console.log({ payload })
  switch (type) {
    case UserTypes.AUTH_REQUEST:
    case UserTypes.AUTH_LOGIN_REQUEST:
    case UserTypes.AUTH_USER_LOAD_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case UserTypes.AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      };

    case UserTypes.AUTH_LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        loading: false,
      };

    case UserTypes.AUTH_USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        userAuth: payload,
      };

    case UserTypes.AUTH_ERROR:
    case UserTypes.AUTH_LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        users: {},
        userAuth: {
          id: "",
          firstName: "",
          lastName: "",
          email: "",
          role: "",
          institution: "",
          city: "",
          country: "",
        },
        error: payload,
      };

    default:
      return state;
  }
}
