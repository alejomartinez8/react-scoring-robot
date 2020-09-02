import { userTypes } from '../types';
import { userServices } from '../services/';
import { setAlert } from './alert.actions';
import setAuthToken from '../../helpers/setAuthToken';
import axios from 'axios';

// loadUser
export const loadUser = () => (dispatch) => {
  console.log('loadUser action');
  dispatch({ type: userTypes.AUTH_REQUEST });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  userServices.loadUser().then(
    (user) => {
      dispatch({ type: userTypes.USER_LOADED, payload: user });
    },
    (error) => {
      dispatch({ type: userTypes.AUTH_ERROR });
    }
  );
};

// login
export const login = (email, password) => (dispatch) => {
  dispatch({ type: userTypes.AUTH_REQUEST });

  userServices.login(email, password).then(
    (token) => {
      dispatch({ type: userTypes.LOGIN_SUCCESS, payload: token });
      dispatch(loadUser());
    },
    (error) => {
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
      dispatch({ type: userTypes.REGISTER_SUCCESS, payload: response });
      dispatch(setAlert(response.message, 'success'));
    },
    (error) => {
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
      dispatch({ type: userTypes.AUTH_REQUEST_SUCCESS });
      dispatch(setAlert(res.message, 'success'));
    },
    (error) => {
      dispatch({ type: userTypes.AUTH_ERROR });
      dispatch(setAlert(error.toString(), 'danger'));
    }
  );
};

export const resetPassword = ({ token, password, confirmPassword }) => (dispatch) => {
  console.log('resetPassword');
  dispatch({ type: userTypes.AUTH_REQUEST });

  userServices
    .resetPassword({ token, password, confirmPassword })
    .then(() => {
      dispatch({ type: userTypes.AUTH_REQUEST_SUCCESS });
      dispatch(setAlert('Contraseña actualizada exitosamente, puede ingresar', 'success'));
    })
    .catch(() => {
      dispatch({ type: userTypes.AUTH_ERROR });
      dispatch(
        setAlert(
          'Token no válido, no es posible actualizar su contraseña, debes solicitar restablecer tu contraseña nuevamente',
          'danger'
        )
      );
    });
};
