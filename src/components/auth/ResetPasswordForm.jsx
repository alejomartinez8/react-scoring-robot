import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authActions, alertActions } from "../../redux/actions/";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const ResetPasswordForm = ({ token, setAlert, loading, resetPassword, history }) => {
  const [formData, setformData] = useState(initialValues);
  const { password, confirmPassword } = formData;

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      resetPassword({ token, password, confirmPassword });
      history.push("login");
    } else {
      setAlert("Constraseñas deben coincidir", "danger");
    }
  };

  // return form after validate token
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Constraseña</label>
        <input
          className="form-control"
          type="password"
          placeholder="Nueva contraseña"
          name="password"
          value={password}
          onChange={handleChange}
          required
        ></input>
      </div>

      <div className="form-group">
        <label>Confirmar Constraseña</label>
        <input
          className="form-control"
          type="password"
          placeholder="Confirmar contraseña"
          name="confirmPassword"
          value={confirmPassword}
          onChange={handleChange}
          required
        ></input>
      </div>
      <div className="form-group">
        <button
          type="submit"
          className="btn btn-lg btn-block btn-primary mb-3"
          disabled={loading}
        >
          {loading && (
            <span className="spinner-border spinner-border-sm mr-1"></span>
          )}
          Enviar
        </button>
        <p className="text-center">
          <small className="text-muted">
            <Link to="/login">Cancelar</Link>
          </small>
        </p>
      </div>
    </form>
  );
};

ResetPasswordForm.propTypes = {
  setAlert: PropTypes.func.isRequired,
  resetPassword: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

const actionCreators = {
  resetPassword: authActions.resetPassword,
  setAlert: alertActions.setAlert,
};

export default connect(mapStateToProps, actionCreators)(ResetPasswordForm);
