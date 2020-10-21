import { UserTypes } from "../constants";
import { userServices } from "../services/";
import { alertActions } from "./alert.actions";
import setAuthToken from "../../helpers/setAuthToken";

// load user action
export const loadUser = () => (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  dispatch({ type: UserTypes.AUTH_USER_LOAD_REQUEST });

  userServices
    .loadUser()
    .then((user) => {
      dispatch({ type: UserTypes.AUTH_USER_LOADED, payload: user });
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

/** User Actions */

// get all user actions
export const getUsers = () => (dispatch) => {
  dispatch({ type: UserTypes.GET_USERS });

  userServices
    .getUsers()
    .then((users) => {
      dispatch({ type: UserTypes.USERS_LOADED, payload: users });
    })
    .catch((error) => {
      dispatch({ type: UserTypes.USER_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
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
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

// create user action
export const createUser = (user) => (dispatch) => {
  userServices
    .createUser(user)
    .then(() => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      dispatch(alertActions.setAlert("Usuario Creado", "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

// update user action
export const updateUser = (id, params) => (dispatch) => {
  dispatch({ type: UserTypes.AUTH_REQUEST });

  userServices
    .updateUser(id, params)
    .then((user) => {
      dispatch({ type: UserTypes.AUTH_REQUEST_SUCCESS });
      // dispatch(loadUser());
      dispatch(getUserById(id));
      dispatch(alertActions.setAlert("Usuario Actualizado", "success"));
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

// delete user action
export const deleteUser = (id) => (dispatch) => {
  userServices
    .deleteUser(id)
    .then((res) => {
      console.log(res);
      if (res.type === "delete-success") {
        dispatch(
          alertActions.setAlert(
            `Usuario ${res.user.firstName} ${res.user.lastName} Eliminado`,
            "success"
          )
        );
        dispatch(getUsers());
      } else {
        dispatch(alertActions.setAlert(res.message, "warning"));
      }
    })
    .catch((error) => {
      dispatch({ type: UserTypes.AUTH_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

export const clearUser = () => (dispatch) => {
  dispatch({ type: UserTypes.CLEAR_USER });
};

export const userActions = {
  loadUser,
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  clearUser,
};
