import { UserTypes } from "../constants/UserTypes"

const initialState = {
  token: localStorage.getItem("token"),
  isAuth: false,
  loading: false,
  user: null,
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

    case UserTypes.USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: payload,
      }
    case UserTypes.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token)
      return {
        ...state,
        token: payload.token,
        isAuth: true,
        loading: false,
      }
    case UserTypes.AUTH_ERROR:
    case UserTypes.LOGIN_FAIL:
    case UserTypes.REGISTER_FAIL:
    case UserTypes.LOGOUT:
      localStorage.removeItem("token")
      return {
        ...state,
        error: payload,
        token: null,
        isAuth: false,
        loading: false,
      }

    case UserTypes.AUTH_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
      }

    default:
      return state
  }
}
