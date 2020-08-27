import { accountTypes } from '../types';
import { accountService } from '../services/account.service';
import { setAlert } from './alert.actions';

export const userActions = {
  login
};

// login
function login(email, password) {
  return (dispatch) => {
    dispatch({ type: accountTypes.LOGIN_REQUEST, user });

    accountService.login(email, password).then(
      (user) => {
        dispatch({ type: accountTypes.LOGIN_REQUEST, user });
      },
      (error) => {
        dispatch({type: accountTypes.LOGIN_FAIL, error});
        dispatch(setAlert(error.toString(), 'danger');
      }
    );
  };
}
