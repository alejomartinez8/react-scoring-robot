import { v4 as uuidv4 } from "uuid";
import { AlertTypes } from "../constants/AlertTypes";

const setAlert = (msg, alertType, callback) => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: AlertTypes.SET_ALERT,
    payload: { id, msg, alertType, callback },
  });
};

const deleteAlert = (id) => (dispatch) => {
  dispatch({ type: AlertTypes.REMOVE_ALERT, payload: id });
};

export const alertActions = {
  setAlert,
  deleteAlert,
};
