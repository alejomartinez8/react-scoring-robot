import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { userServices } from '../../redux/services';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setAlert } from '../../redux/actions/alert.actions';
import Alert from '../../components/layout/Alert';
import ResetPasswordForm from '../../components/user/ResetPasswordForm';

const ResetPassword = ({ history, setAlert }) => {
  const TokenStatus = {
    Validating: 'Validating',
    Valid: 'Valid',
    Invalid: 'Invalid'
  };

  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(history.location.search);
    // remove token from url to prevent http referer leakage
    history.replace(history.location.pathname);

    userServices
      .validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
        setAlert('Token validado, ingresa nuevamente tu contraseña', 'success', 3000);
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
  }, []);

  //Get body (switch)
  const getBody = () => {
    switch (tokenStatus) {
      case TokenStatus.Validating:
        return <div>Validando token...</div>;
      case TokenStatus.Valid:
        return <ResetPasswordForm token={token} history={history} />;
      case TokenStatus.Invalid:
      default:
        return (
          <div>
            Token no válido, si el token ha expirado puede solicitar uno nuevamente en el link de la
            página <Link to='forgot-password'>Olvidé Contraseña</Link>
          </div>
        );
    }
  };

  // return Component
  return (
    <div className='container d-flex flex-column'>
      <div className='row justify-content-center'>
        <div className='col-md-5'>
          <div className='text-center'>
            <h1 className='display-4 mb-3'>Restablecer Contraseña</h1>
            <Alert />
            {getBody()}
          </div>
        </div>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { setAlert })(ResetPassword);
