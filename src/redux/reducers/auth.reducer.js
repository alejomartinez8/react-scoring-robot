import { UserTypes } from "../constants/UserTypes"

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  loading: false,
  user: {
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    institution: "",
    city: "",
    country: "",
  },
  users: [],
  error: [],
}

export function auth(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case UserTypes.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
      }

    case UserTypes.AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    case UserTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        loading: false,
      }

    case UserTypes.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      }

    case UserTypes.USERS_LOADED:
      return {
        ...state,
        loading: false,
        users: [...payload],
      }
    case UserTypes.AUTH_ERROR:
    case UserTypes.LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
        users: {},
        user: {
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
      }

    default:
      return state
  }
}
