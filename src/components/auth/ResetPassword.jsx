import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { authServices } from "../../redux/services";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { alertActions } from "../../redux/actions/";
import ResetPasswordForm from "./ResetPasswordForm";

const TokenStatus = {
  Validating: "Validating",
  Valid: "Valid",
  Invalid: "Invalid",
};

const ResetPassword = ({ history, setAlert }) => {
  const [token, setToken] = useState(null);
  const [tokenStatus, setTokenStatus] = useState(TokenStatus.Validating);

  useEffect(() => {
    const { token } = queryString.parse(history.location.search);
    // remove token from url to prevent http referer leakage
    history.replace(history.location.pathname);

    authServices
      .validateResetToken(token)
      .then(() => {
        setToken(token);
        setTokenStatus(TokenStatus.Valid);
        setAlert(
          "Token validado, ingresa nuevamente tu contraseña",
          "success",
          3000
        );
      })
      .catch(() => {
        setTokenStatus(TokenStatus.Invalid);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            Token no válido, si el token ha expirado puede solicitar uno nuevamente
            en el link de la página{" "}
            <Link to="forgot-password">Olvidé Contraseña</Link>
          </div>
        );
    }
  };

  // return Component
  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-lg-6 p-0">
        <div className="card">
          <div className="card-header">
            <h2 className="text-primary">Restablecer Contraseña</h2>
          </div>
          <div className="card-body">{getBody()}</div>
        </div>
      </div>
    </div>
  );
};

ResetPassword.propTypes = {
  setAlert: PropTypes.func.isRequired,
};

const actionsCreators = {
  setAlert: alertActions.setAlert,
};

export default connect(null, actionsCreators)(ResetPassword);
