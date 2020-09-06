import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

const AddEdit = ({ history, match, loading }) => {
  const { id } = match.params
  const isAddMode = !id

  // load if Edit User
  useEffect(() => {
    if (!isAddMode) {
    }
  })

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
    acceptTerms: true,
  }

  const [formData, setformData] = useState(initialState)

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
    acceptTerms = true,
  } = formData

  const handleChange = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }
  return (
    <form className="form" onSubmit={handleSubmit}>
      <h1>{isAddMode ? "Agregar Usuario" : "Editar Usuario"}</h1>
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
        <label>Role</label>
        <select
          className={"form-control"}
          type="select"
          name="role"
          value={role}
          onChange={handleChange}
        >
          <option value=""></option>
          <option value="User">User</option>
          <option value="Judge">Judge</option>
          <option value="Admin">Admin</option>
        </select>
      </div>

      {!isAddMode && (
        <div>
          <h3 className="pt-3">Cambiar Contraseña</h3>
          <p>Dejar en blanco para conservar la misma contraseña</p>
        </div>
      )}

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
        <label htmlFor="register-agree"> Acepto Términos y Condiciones </label>
      </div>

      <button
        type="submit"
        className="btn btn-lg btn-primary mb-3"
        disabled={loading}
      >
        {loading && <span className="spinner-border spinner-border-sm mr-1"></span>}
        Guardar
      </button>

      <Link to={isAddMode ? "." : ".."} className="btn btn-link">
        Cancel
      </Link>
    </form>
  )
}

export default AddEdit
