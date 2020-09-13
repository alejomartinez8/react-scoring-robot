import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createUser, updateUser } from "../../../redux/actions/user.actions";
import Spinner from "../../layout/Spinner";

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
  role: "User",
};

const UserForm = ({ user: { user, loading }, createUser, updateUser, history }) => {
  const userUpdate = Object.keys(user).length !== 0;

  // load if Edit User
  useEffect(() => {
    if (!loading && userUpdate) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) {
          userData[key] = user[key];
        }
      }
      setFormData(userData);
    }
  }, [loading, user, userUpdate]);

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
    role,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userUpdate) {
      console.log("updateUser");
      updateUser(user.id, formData);
    } else {
      console.log("createUser");
      createUser(formData);
      setFormData(initialState);
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to="/admin/users" className="btn btn-sm btn-primary mb-2">
            Atrás
          </Link>

          <div className="card shadow">
            <div className="card-header">
              <h2 className="text-primary">
                {!userUpdate ? "Agregar Usuario" : "Editar Usuario"}
              </h2>
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
                    placeholder="Apellidos"
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
                  <label>Institución Educativa</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Colegio o Escuela de Robótica"
                    name="institution"
                    value={institution}
                    onChange={handleChange}
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
                  />
                </div>

                <div className="form-group">
                  <label>Role*</label>
                  <select
                    className={"form-control"}
                    type="select"
                    name="role"
                    value={role}
                    onChange={handleChange}
                  >
                    <option value="User">User</option>
                    <option value="Judge">Judge</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                {userUpdate && (
                  <div>
                    <h3 className="pt-3">Cambiar Contraseña</h3>
                    <p>Dejar en blanco para conservar la misma contraseña</p>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group mr-3">
                    <label>Contraseña{!userUpdate && "*"}</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Contraseña"
                      name="password"
                      value={password}
                      onChange={handleChange}
                      required={!user}
                    />
                  </div>

                  <div className="form-group">
                    <label>Confirmar Contraseña{!userUpdate && "*"}</label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Confirmar Contraseña"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      required={!user}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary m-1"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm mr-1"></span>
                    )}
                    Guardar
                  </button>
                  <Link to="/admin/users" className="btn btn-secondary m-1">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

UserForm.propTypes = {
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps, { createUser, updateUser })(UserForm);
