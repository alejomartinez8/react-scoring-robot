import { userTypes } from '../types';
import { userServices } from '../services/';
import { setAlert } from './alert.actions';
import setAuthToken from '../../helpers/setAuthToken';
// import axios from 'axios';

// loadUser
export const loadUser = () => (dispatch) => {
  console.log('loadUser action');

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  dispatch({ type: userTypes.AUTH_REQUEST });

  userServices.loadUser().then(
    (user) => {
      dispatch({ type: userTypes.USER_LOADED, payload: user });
    },
    (error) => {
      console.log('user.actions.loadUser error:', error.toString());
      dispatch({ type: userTypes.AUTH_ERROR });
    }
  );
};

// login
export const login = (email, password) => (dispatch) => {
  console.log('login action');
  dispatch({ type: userTypes.AUTH_REQUEST });

  userServices.login(email, password).then(
    (token) => {
      dispatch({ type: userTypes.LOGIN_SUCCESS, payload: token });
      dispatch(loadUser());
    },
    (error) => {
      console.log('user.action.login error: ', error.toString());
      dispatch({ type: userTypes.LOGIN_FAIL, payload: error });
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
  dispatch({ type: userTypes.AUTH_REQUEST });

  userServices.register(user).then(
    (response) => {
      console.log('register response: ', response.message);
      dispatch({ type: userTypes.REGISTER_SUCCESS, payload: response });
      dispatch(setAlert(response.message, 'success'));
    },
    (error) => {
      console.log('register error: ', error.toString());
      dispatch({ type: userTypes.REGISTER_FAIL, payload: error });
      dispatch(setAlert(error.toString(), 'danger'));
    }
  );
};

//forgot-password
export const forgotPassword = (email) => (dispatch) => {
  dispatch({ type: userTypes.AUTH_REQUEST });
  userServices.forgotPassword(email).then(
    (res) => {
      console.log('forgotPassword res: ', res.message);
      dispatch({ type: userTypes.AUTH_REQUEST_SUCCESS });
      dispatch(setAlert(res.message, 'success'));
    },
    (error) => {
      console.log('forgotPassword error: ', error.toString());
      dispatch({ type: userTypes.AUTH_ERROR });
      dispatch(setAlert(error.toString(), 'danger'));
    }
  );
};
