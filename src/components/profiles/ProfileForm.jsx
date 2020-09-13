import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { updateUser } from "../../redux/actions/user.actions";

const ProfileForm = ({ auth: { userAuth, loading }, updateUser }) => {
  // inistal data to update
  const initialState = {
    email: userAuth.email,
    firstName: userAuth.firstName,
    lastName: userAuth.lastName,
    password: "",
    confirmPassword: "",
    institution: userAuth.institution,
    city: userAuth.city,
    country: userAuth.country,
    bio: userAuth.bio,
  };

  const [formData, setFormData] = useState(initialState);

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
  } = formData;

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Create Profile");
    updateUser(userAuth.id, formData);
  };

  return (
    <Fragment>
      <Link to="/profile" className="btn btn-sm btn-primary mb-2">
        Atrás
      </Link>
      <div className="card shadow">
        <div className="card-header">
          <h2 className="card-title">Editar Perfil</h2>
        </div>
        <div className="card-body">
          <small>* = campos requeridos</small>
          <form onSubmit={handleSubmit} className="form">
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
              <label>Ciudad</label>
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
              <label>País</label>
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
              <div className="form-group col-md-3">
                <label>Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Contraseña"
                  name="password"
                  value={password}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-3">
                <label>Confirmar Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirmar Contraseña"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary mx-1"
              disabled={loading}
            >
              {loading && (
                <span className="spinner-border spinner-border-sm m-1"></span>
              )}
              Actualizar
            </button>

            <Link to="." className="btn btn-secondary m-1">
              Cancel
            </Link>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

//snippet rpt
ProfileForm.propTypes = {
  auth: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  deleteUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { updateUser })(ProfileForm);
