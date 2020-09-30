import { v4 as uuidv4 } from "uuid";
import { AlertTypes } from "../constants/AlertTypes";

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: AlertTypes.SET_ALERT,
    payload: { msg, alertType, id },
  });

  // setTimeout(
  //   () => dispatch({ type: AlertTypes.REMOVE_ALERT, payload: id }),
  //   timeout
  // );
};

export const alertActions = {
  setAlert,
};
