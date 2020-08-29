import { userTypes } from '../types';
import { userServices } from '../services/';
import { setAlert } from './alert.actions';
import axios from 'axios';

// loadUser
export const loadUser = () => (dispatch) => {
  console.log('loadUser action');

  // try {
  //   const res = await axios.get('http://localhost:5050/users');
  //   console.log(res);
  //   dispatch({
  //     type: userTypes.USER_LOADED,
  //     payload: res.data
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: userTypes.AUTH_ERROR
  //   });
  // }

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
  dispatch({ type: userTypes.REGISTER_REQUEST, user });
  userServices.register(user).then(
    (response) => {
      console.log('register response: ', response.message);
      dispatch({ type: userTypes.REGISTER_SUCCESS, payload: response });
      dispatch(setAlert(response.message, 'success'));
    },
    (error) => {
      console.log('regiter error: ', error.toString());
      dispatch({ type: userTypes.REGISTER_FAIL, payload: error });
      dispatch(setAlert(error.toString(), 'danger'));
    }
  );
};
