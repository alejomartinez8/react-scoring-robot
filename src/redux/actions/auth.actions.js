import { UserTypes } from "../constants";
import { authServices } from "../services/";
import { loadUser } from "./user.actions";
import { setAlert } from "./alert.actions";

// login action
export const login = (email, password) => (dispatch) => {
  authServices
    .login(email, password)
    .then((token) => {
      dispatch({ type: UserTypes.AUTH_LOGIN_SUCCESS, payload: token });
      dispatch(setAlert("Bienvenido", "success"));
      dispatch(loadUser());
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// logout action
export const logout = () => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_LOGOUT });
};

// register action
export const register = (user) => (dispatch) => {
  authServices
    .register(user)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS, payload: res });
      dispatch(setAlert(res.message, "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger", 20000));
    });
};

// forgot password action send an email
export const forgotPassword = (email) => (dispatch) => {
  authServices
    .forgotPassword(email)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      dispatch(setAlert(res.message, "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// reset password action
export const resetPassword = ({ token, password, confirmPassword }) => (
  dispatch
) => {
  authServices
    .resetPassword({ token, password, confirmPassword })
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      dispatch(
        setAlert("Contraseña actualizada exitosamente, puede ingresar", "success")
      );
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};
