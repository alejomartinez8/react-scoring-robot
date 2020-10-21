import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authActions } from "../../redux/actions/";
// import GoogleLogin from "react-google-login";
// import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";

const Login = ({ login, loginGoogle, loginFacebook, loading }) => {
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

  // const responeGoogle = (res) => {
  //   console.log(res.tokenObj);
  //   loginGoogle(res.tokenObj.access_token);
  // };

  // const handleGoogleFailure = (res) => {
  //   console.log("Failed to log in with Google", res);
  // };

  // const responseFacebook = (res) => {
  //   console.log(res);
  //   if (res.accessToken) {
  //     loginFacebook(res.accessToken);
  //   }
  // };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-lg-6 col-sm-12 p-0">
        <div className="card">
          <div className="card-header">
            <h2 className="text-primary">Ingreso</h2>
          </div>
          <div className="card-body">
            <form className="form user" onSubmit={handleSubmit}>
              {/* <div className="form-group">
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_ID}
                  render={(renderProps) => (
                    <button
                      className="btn btn-lg btn-block btn-google"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <i className="fab fa-google fa-fw"></i> Ingresar con Google
                    </button>
                  )}
                  onSuccess={responeGoogle}
                  onFailure={handleGoogleFailure}
                  cookiePolicy={"single_host_origin"}
                  responseType="code,token"
                />
                <FacebookLogin
                  appId={process.env.REACT_APP_FACEBOOK_ID}
                  fields="name,email,picture"
                  callback={responseFacebook}
                  render={(renderProps) => (
                    <button
                      className="btn btn-lg btn-block btn-facebook "
                      onClick={renderProps.onClick}
                    >
                      <i className="fab fa-facebook-f fa-fw"></i> Ingresar con
                      Facebook
                    </button>
                  )}
                />
              </div>
              <hr /> */}
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
                {/* <p className="text-center">
                  <small className="text-muted">
                    ¿Todavía no tienes cuenta? <Link to="register">Registarse</Link>
                  </small>
                </p> */}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  loading: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

const actionCreators = {
  login: authActions.login,
  loginGoogle: authActions.loginGoogle,
  loginFacebook: authActions.loginFacebook,
};

export default connect(mapStateToProps, actionCreators)(Login);
