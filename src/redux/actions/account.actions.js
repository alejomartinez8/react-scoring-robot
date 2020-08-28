import { accountTypes } from '../types';
import { accountService } from '../services/account.service';
import { setAlert } from './alert.actions';

// login
export const login = (email, password) => {
  return (dispatch) => {
    dispatch({ type: accountTypes.LOGIN_REQUEST, email });

    accountService.login(email, password).then(
      (user) => {
        dispatch({ type: accountTypes.LOGIN_SUCCESS, user });
      },
      (error) => {
        dispatch(setAlert(error.toString(), 'danger'));
        dispatch({ type: accountTypes.LOGIN_FAIL, error });
      }
    );
  };
};
