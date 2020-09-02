import React from "react"
import { Link } from "react-router-dom"
import { useState } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const ProfileUpdate = ({ auth: { user, loading }, history }) => {
  const initialState = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    password: "",
    confirmPassword: "",
    institution: user.institution,
    city: "",
    country: "",
    bio: "",
  }

  const [formData, setFormData] = useState(initialState)
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
  } = formData

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Create Profile")
  }

  return (
    <div className="card shadow">
      <div className="card-header border-primary">
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

          <div className="form-group mb-4">
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

          <div className="form-group mb-4">
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
            ></input>
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
            ></input>
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
            ></input>
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

          <button type="submit" className="btn btn-primary mx-1" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm m-1"></span>
            )}
            Actualizar
          </button>

          <Link to="." className="btn btn-secondary m-1">
            Cancel
          </Link>

          <button className="btn btn-danger m-1">
            <i className="fas fa-user-minus"></i> Eliminar Cuenta
          </button>
        </form>
      </div>
    </div>
  )
}

//snippet rpt
ProfileUpdate.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(ProfileUpdate)
