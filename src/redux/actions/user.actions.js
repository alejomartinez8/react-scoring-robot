import { UserTypes } from "../constants";
import { userServices } from "../services/";
import { setAlert } from "./alert.actions";
import setAuthToken from "../../helpers/setAuthToken";

// load user action
export const loadUser = () => (dispatch) => {
  console.log("loadUser action");
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  dispatch({ type: UserTypes.AUTH_REQUEST });

  userServices
    .loadUser()
    .then((user) => {
      dispatch({ type: UserTypes.AUTH_USER_LOADED, payload: user });
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// login action
export const login = (email, password) => (dispatch) => {
  userServices
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
  userServices
    .register(user)
    .then((res) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS, payload: res });
      dispatch(setAlert(res.message, "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// forgot password action send an email
export const forgotPassword = (email) => (dispatch) => {
  console.log("forgotPassword action");

  userServices
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
  console.log("resetPassword");

  userServices
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

/** User Actions */

// get all user actions
export const getAllUsers = () => (dispatch) => {
  dispatch({ type: UserTypes.GET_USERS });

  userServices
    .getAllUsers()
    .then((users) => {
      dispatch({ type: UserTypes.USERS_LOADED, payload: users });
    })
    .catch((error) => {
      dispatch({ type: UserTypes.USER_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// get user by Id
export const getUserById = (id) => (dispatch) => {
  dispatch({ type: UserTypes.GET_USER });

  userServices
    .getById(id)
    .then((user) => {
      console.log(user);
      dispatch({ type: UserTypes.USER_LOADED, payload: user });
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// create user action
export const createUser = (user) => (dispatch) => {
  console.log("createUser action");

  userServices
    .createUser(user)
    .then(() => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      dispatch(setAlert("Usuario Creado", "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// update user action
export const updateUser = (id, params) => (dispatch) => {
  console.log("updateUser action");

  userServices
    .updateUser(id, params)
    .then((user) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      dispatch(loadUser());
      dispatch(getUserById(user.id));
      dispatch(setAlert("Usuario Actualizado", "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

// delete user action
export const deleteUser = (id) => (dispatch) => {
  console.log("delete user action");

  userServices
    .deleteUser(id)
    .then((res) => {
      dispatch({ type: UserTypes.USER_DELETE, payload: id });
      dispatch(getAllUsers());
      dispatch(setAlert("Usuario Eliminado", "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

export const clearUser = () => (dispatch) => {
  dispatch({ type: UserTypes.CLEAR_USER });
};
