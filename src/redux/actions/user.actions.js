import { userTypes } from '../types';
import { userServices } from '../services/';
import { setAlert } from './alert.actions';

// login
export const login = (email, password) => (dispatch) => {
  console.log('userService.login');
  userServices.login(email, password).then(
    (user) => {
      dispatch({ type: userTypes.LOGIN_SUCCESS, user });
    },
    (error) => {
      console.log('user.action.login error: ', error.toString());
      dispatch({ type: userTypes.LOGIN_FAIL, error });
      dispatch(setAlert(error.toString(), 'danger'));
    }
  );
};

// logout
export const logout = () => (dispatch) => {
  dispatch({ type: userTypes.LOGOUT });
};

// register
export const register = (user) => (dispatch) => {
  dispatch({ type: userTypes.REGISTER_REQUEST, user });
  userServices.register(user).then(
    (response) => {
      console.log('register response: ', response.message);
      dispatch({ type: userTypes.REGISTER_SUCCESS, response });
      dispatch(setAlert(response.message, 'success'));
    },
    (error) => {
      console.log('regiter error: ', error.toString());
      dispatch({ type: userTypes.REGISTER_FAIL, error });
      dispatch(setAlert(error.toString(), 'danger'));
    }
  );
};
