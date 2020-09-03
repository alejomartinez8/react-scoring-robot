import { userTypes } from "../types"
import { userServices } from "../services/"
import { setAlert } from "./alert.actions"
import setAuthToken from "../../helpers/setAuthToken"

// load user action
export const loadUser = () => (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  dispatch({ type: userTypes.AUTH_REQUEST })

  userServices
    .loadUser()
    .then((user) => {
      dispatch({ type: userTypes.USER_LOADED, payload: user })
    })
    .catch((error) => {
      dispatch({ type: userTypes.AUTH_ERROR, payload: error })
    })
}

// login action
export const login = (email, password) => (dispatch) => {
  dispatch({ type: userTypes.AUTH_REQUEST })

  userServices
    .login(email, password)
    .then((token) => {
      dispatch({ type: userTypes.LOGIN_SUCCESS, payload: token })
      dispatch(loadUser())
    })
    .catch((error) => {
      dispatch({ type: userTypes.LOGIN_FAIL, payload: error })
      dispatch(setAlert(error.toString(), "danger"))
    })
}

// logout action
export const logout = () => (dispatch) => {
  dispatch({ type: userTypes.LOGOUT })
}

// register action
export const register = (user) => (dispatch) => {
  dispatch({ type: userTypes.AUTH_REQUEST })

  userServices
    .register(user)
    .then((res) => {
      dispatch({ type: userTypes.AUTH_REQUEST_SUCCESS, payload: res })
      dispatch(setAlert(res.message, "success"))
    })
    .catch((error) => {
      dispatch({ type: userTypes.REGISTER_FAIL, payload: error })
      dispatch(setAlert(error.toString(), "danger"))
    })
}

// forgot password action send an email
export const forgotPassword = (email) => (dispatch) => {
  dispatch({ type: userTypes.AUTH_REQUEST })
  userServices
    .forgotPassword(email)
    .then((res) => {
      dispatch({ type: userTypes.AUTH_REQUEST_SUCCESS })
      dispatch(setAlert(res.message, "success"))
    })
    .catch((error) => {
      dispatch({ type: userTypes.AUTH_ERROR })
      dispatch(setAlert(error.toString(), "danger"))
    })
}

// reset password action
export const resetPassword = ({ token, password, confirmPassword }) => (
  dispatch
) => {
  console.log("resetPassword")
  dispatch({ type: userTypes.AUTH_REQUEST })

  userServices
    .resetPassword({ token, password, confirmPassword })
    .then((res) => {
      dispatch({ type: userTypes.AUTH_REQUEST_SUCCESS })
      dispatch(
        setAlert("Contraseña actualizada exitosamente, puede ingresar", "success")
      )
    })
    .catch((error) => {
      dispatch({ type: userTypes.AUTH_ERROR, payload: error })
      dispatch(
        setAlert(
          "Token no válido, no es posible actualizar su contraseña, debes solicitar restablecer tu contraseña nuevamente",
          "danger"
        )
      )
    })
}

// update user action
export const update = (id, params) => {
  userServices
    .update(id, params)
    .then((user) => {
      console.log(user)
    })
    .catch((error) => {
      console.log(error)
    })
}
