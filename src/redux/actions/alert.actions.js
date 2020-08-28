import { v4 as uuidv4 } from 'uuid';
import { alertTypes } from '../types/alert.types';

export const setAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
  console.log('setAlert: ', msg);
  const id = uuidv4();
  dispatch({
    type: alertTypes.SET_ALERT,
    payload: { msg, alertType, id }
  });

  setTimeout(() => dispatch({ type: alertTypes.REMOVE_ALERT, payload: id }), timeout);
};
