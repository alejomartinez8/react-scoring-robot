import { UserTypes } from "../constants"
import { userServices } from "../services/"
import { setAlert } from "./alert.actions"
import setAuthToken from "../../helpers/setAuthToken"

// load user action
export const loadUser = () => (dispatch) => {
  console.log("loadUser action")
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .loadUser()
    .then((user) => {
      dispatch({ type: UserTypes.USER_LOADED, payload: user })
    })
    .catch(handleError)
}

export const clearUser = () => (dispatch) => {
  dispatch({ type: UserTypes.CLEAR_USER })
}

// login action
export const login = (email, password) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .login(email, password)
    .then((token) => {
      dispatch({ type: UserTypes.LOGIN_SUCCESS, payload: token })
      dispatch(loadUser())
    })
    .catch(handleError)
}

// logout action
export const logout = () => (dispatch) => {
  dispatch({ type: UserTypes.LOGOUT })
}

// register action
export const register = (user) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .register(user)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS, payload: res })
      dispatch(setAlert(res.message, "success"))
    })
    .catch(handleError)
}

// forgot password action send an email
export const forgotPassword = (email) => (dispatch) => {
  console.log("forgotPassword action")

  dispatch({ type: UserTypes.AUTH_REQUEST })
  userServices
    .forgotPassword(email)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS })
      dispatch(setAlert(res.message, "success"))
    })
    .catch(handleError)
}

// reset password action
export const resetPassword = ({ token, password, confirmPassword }) => (
  dispatch
) => {
  console.log("resetPassword")
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .resetPassword({ token, password, confirmPassword })
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS })
      dispatch(
        setAlert("Contraseña actualizada exitosamente, puede ingresar", "success")
      )
    })
    .catch(handleError)
}

// get all user actions
export const getAllUsers = () => (dispatch) => {
  console.log("get all users actions")
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .getAllUsers()
    .then((users) => {
      dispatch({ type: UserTypes.USERS_LOADED, payload: users })
    })
    .catch(handleError)
}

// get user by Id
export const getUserById = (id) => (dispatch) => {
  console.log("getById action")
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .getById(id)
    .then((user) => {
      console.log(user)
      dispatch({ type: UserTypes.UPDATE_USER, payload: user })
    })
    .catch(handleError)
}

// create user action
export const createUser = (user) => (dispatch) => {
  console.log("createUser action")
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .createUser(user)
    .then((user) => {
      dispatch({ type: UserTypes.AUTH_REQUEST })
      dispatch(setAlert("Usuario Creado", "success"))
    })
    .catch(handleError)
}

// update user action
export const updateUser = (id, params) => (dispatch) => {
  console.log("updateUser action")
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .updateUser(id, params)
    .then((user) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS })
      dispatch(setAlert("Usuario Actualizado", "success"))
    })
    .catch(handleError)
}

// delete user action
export const deleteUser = (id) => (dispatch) => {
  console.log("delete user action")
  dispatch({ type: UserTypes.AUTH_REQUEST })

  userServices
    .deleteUser(id)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS, res })
    })
    .catch(handleError)
}

const handleError = (error) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_ERROR, error: error.data })
  dispatch(setAlert(error.toString(), "danger"))
}
