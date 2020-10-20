import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authActions } from "../../redux/actions";

const initialState = {
  email: "",
};

const ForgotPassword = ({ auth, forgotPassword, history }) => {
  const [formData, setformData] = useState(initialState);
  const { email } = formData;

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email es inválido").required("Email requerido"),
  });

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData)
      .then(function (data) {
        forgotPassword(data.email);
      })
      .catch(function (error) {
        console.log(error.errors);
      });
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-lg-6 p-0">
        <div className="card">
          <div className="card-header">
            <h2 className="text-primary">Recuperar Contraseña</h2>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
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

              <div className="form-group">
                <button
                  className="btn btn-lg btn-block btn-primary mb-3"
                  disabled={auth.loading}
                >
                  {auth.loading && (
                    <span className="spinner-border spinner-border-sm mr-1"></span>
                  )}
                  Enviar
                </button>
                <p className="text-center">
                  <small className="text-muted">
                    <Link to="login">Cancelar</Link>
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

ForgotPassword.propTypes = {
  auth: PropTypes.object.isRequired,
  forgotPassword: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const actionCreators = {
  forgotPassword: authActions.forgotPassword,
};

export default connect(mapStateToProps, actionCreators)(ForgotPassword);
