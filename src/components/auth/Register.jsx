import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { authActions } from "../../redux/actions";
import { alertActions } from "../../redux/actions/";

const Register = ({ isAuth, loading, register, setAlert }) => {
  // inistal data
  const initialState = {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    institution: "",
    city: "",
    country: "",
    bio: "",
    acceptTerms: true,
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("Nombres requeridos"),
    lastName: Yup.string().required("Apellidos requeridos"),
    email: Yup.string().email("Email no válido").required("Email requerido"),
    password: Yup.string()
      .min(6, "Contraseña mínimo de 6 caracteres")
      .required("Contraseña requerida"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Constraseñas deben coincidir")
      .required("Confirma la constraseña"),
    acceptTerms: Yup.bool().oneOf([true], "Acepta los términos y referencias"),
  });

  const [formData, setformData] = useState(initialState);

  // values
  const {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    institution,
    city,
    country,
    bio,
    acceptTerms,
  } = formData;

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validationSchema
      .validate(formData)
      .then(function (userValid) {
        register(userValid);
      })
      .catch(function (error) {
        console.log(error.errors);
        setAlert(error.errors, "danger");
      });
  };

  if (isAuth) {
    return <Redirect to="/events" />;
  }

  return (
    <div className="d-flex justify-content-center align-items-center">
      <div className="col-md-6 p-0">
        <div className="card">
          <div className="card-header">
            <h2 className="text-primary">Registro Entrenadores</h2>
          </div>
          <div className="card-body">
            <form className="form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Nombres*</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nombres"
                  name="firstName"
                  value={firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Apellidos*</label>
                <input
                  className="form-control"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={handleChange}
                  placeholder="Nombres"
                  required
                />
              </div>
              <div className="form-group">
                <label>Email*</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="nombre@example.com"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Institución Educativa*</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Colegio o Escuela de Robótica"
                  name="institution"
                  value={institution}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Ciudad*</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Medellin"
                  name="city"
                  value={city}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>País*</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Colombia"
                  name="country"
                  value={country}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Cuéntanos un poco sobre ti</label>
                <textarea
                  className="form-control"
                  placeholder="Una breve biografía tuya"
                  name="bio"
                  value={bio}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group mr-3">
                  <label>Contraseña*</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Confirmar Contraseña*</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirmar Contraseña"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group terms-conditions mb-4">
                <input
                  id="register-agree"
                  name="acceptTerms"
                  type="checkbox"
                  required
                  checked={acceptTerms}
                  className="form-control-custom"
                  onChange={() =>
                    setformData({
                      ...formData,
                      acceptTerms: !formData.acceptTerms,
                    })
                  }
                />{" "}
                <label htmlFor="register-agree">
                  {" "}
                  Acepto Términos y Condiciones{" "}
                </label>
              </div>

              <button
                type="submit"
                className="btn btn-lg btn-block btn-primary mb-3"
                disabled={loading}
              >
                {loading && (
                  <span className="spinner-border spinner-border-sm mr-1"></span>
                )}
                Registrar
              </button>

              <p className="text-center">
                <small className="text-muted text-center">
                  ¿Ya tienes cuenta? <Link to="login">Ingresar</Link>.
                </small>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Register.propTypes = {
  isAuth: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  register: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
  loading: state.auth.loading,
});

const actionCreators = {
  register: authActions.register,
  setAlert: alertActions.setAlert,
};

export default connect(mapStateToProps, actionCreators)(Register);
