import { UserTypes } from "../constants";
import { authServices } from "../services/";
import { loadUser } from "./user.actions";
import { alertActions } from "./alert.actions";

// login action
export const login = (email, password) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_LOGIN_REQUEST });

  authServices
    .login(email, password)
    .then((token) => {
      dispatch({ type: UserTypes.AUTH_LOGIN_SUCCESS, payload: token });
      dispatch(loadUser());
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

export const loginGoogle = (access_token) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_LOGIN_REQUEST });

  authServices
    .loginGoogle(access_token)
    .then((token) => {
      dispatch({ type: UserTypes.AUTH_LOGIN_SUCCESS, payload: token });
      dispatch(loadUser());
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

export const loginFacebook = (access_token) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_LOGIN_REQUEST });

  authServices
    .loginFacebook(access_token)
    .then((token) => {
      dispatch({ type: UserTypes.AUTH_LOGIN_SUCCESS, payload: token });
      dispatch(loadUser());
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

// logout action
export const logout = () => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_LOGOUT });
};

// register action
export const register = (user) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_REQUEST });

  authServices
    .register(user)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS, payload: res });
      dispatch(alertActions.setAlert(res.message, "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger", 20000));
    });
};

// forgot password action send an email
export const forgotPassword = (email) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_REQUEST });

  authServices
    .forgotPassword(email)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      dispatch(alertActions.setAlert(res.message, "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

// reset password action
export const resetPassword = ({ token, password, confirmPassword }) => (
  dispatch
) => {
  dispatch({ type: UserTypes.AUTH_REQUEST });

  authServices
    .resetPassword({ token, password, confirmPassword })
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      dispatch(
        alertActions.setAlert(
          "Contraseña actualizada exitosamente, puede ingresar",
          "success"
        )
      );
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

export const authActions = {
  login,
  loginGoogle,
  loginFacebook,
  logout,
  register,
  forgotPassword,
  resetPassword,
};
