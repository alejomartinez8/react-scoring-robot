import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authActions } from "../../redux/actions/";

const Login = ({ isAuth, login, loading }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuth) {
    return <Redirect to="/events" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center m-0">
      <div className="col-lg-6 col-sm-12">
        <div className="card">
          <div className="card-header">
            <h2 className="text-primary">Ingreso</h2>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="name@example.com"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                ></input>
              </div>
              <div className="form-group mb-4">
                <label htmlFor="password">Constraseña</label>
                <input
                  className="form-control"
                  type="password"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                ></input>
                <div className="row">
                  <div className="col-auto">
                    <Link className="form-text" to="forgot-password">
                      Olvidaste constraseña
                    </Link>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button
                  className="btn btn-lg btn-block btn-primary mb-3"
                  disabled={loading}
                >
                  {loading && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Ingresar
                </button>
                <p className="text-center">
                  <small className="text-muted">
                    ¿Todavía no tienes cuenta? <Link to="register">Registarse</Link>
                  </small>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

const actionCreators = {
  login: authActions.login,
};

export default connect(mapStateToProps, actionCreators)(Login);
