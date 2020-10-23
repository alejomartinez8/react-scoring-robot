import React, { useState, useEffect, Fragment } from "react";
import { connect } from "react-redux";
import {
  createUser,
  getUserById,
  updateUser,
} from "../../../redux/actions/user.actions";
import { Spinner } from "react-bootstrap";
import ButtonBack from "../../layout/ButtonBack";

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
  role: "User",
};

const UserForm = ({
  userAuth,
  user: { user, loading },
  getUserById,
  createUser,
  updateUser,
  match,
}) => {
  //load User
  useEffect(() => {
    if (match.params.id) {
      getUserById(match.params.id);
    }
  }, [getUserById, match.params.id]);

  // load if Edit User
  useEffect(() => {
    if (match.params.id && !loading) {
      const userData = { ...initialState };
      for (const key in user) {
        if (key in userData) {
          userData[key] = user[key];
        }
      }
      setFormData(userData);
    }
  }, [loading, user, match.params.id]);

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
    role,
  } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (match.params.id) {
      console.log("updateUser");
      updateUser(user._id, formData);
    } else {
      console.log("createUser");
      createUser(formData);
      setFormData(initialState);
    }
  };

  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <Fragment>
          <ButtonBack className="btn btn-primary mr-1 my-2">Atrás</ButtonBack>

          <div className="card ">
            <div className="card-header">
              <h2 className="text-primary">
                {!match.params.id ? "Agregar Usuario" : "Editar Usuario"}
              </h2>
            </div>
            <div className="card-body">
              <form className="form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Nombres*</label>
                  <input
                    className="form-control"
                    type="text"
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
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Email*</label>
                  <input
                    className="form-control"
                    type="email"
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
                    name="country"
                    value={country}
                    onChange={handleChange}
                  />
                </div>
                {userAuth.role === "Admin" && (
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
                )}

                {userAuth.id === user._id && (
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
                )}

                {match.params.id && (
                  <div>
                    <h3 className="pt-3">Cambiar Contraseña</h3>
                    <p>Dejar en blanco para conservar la misma contraseña</p>
                  </div>
                )}

                <div className="form-row">
                  <div className="form-group mr-3">
                    <label>Contraseña{!match.params.id && "*"}</label>
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
                    <label>Confirmar Contraseña{!match.params.id && "*"}</label>
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
                    className="btn btn-primary mr-2 mb-2"
                    disabled={loading}
                  >
                    {loading && (
                      <span className="spinner-border spinner-border-sm m-1"></span>
                    )}
                    Guardar
                  </button>
                  <ButtonBack className="btn btn-outline-primary mr-2 mb-2">
                    Cancelar
                  </ButtonBack>
                </div>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  userAuth: state.auth.userAuth,
  user: state.user,
});

const actionCreators = {
  createUser,
  updateUser,
  getUserById,
};

export default connect(mapStateToProps, actionCreators)(UserForm);
