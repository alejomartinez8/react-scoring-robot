import React, { Fragment } from "react"
import { useState } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

const initialState = {
  institution: "",
  city: "",
  country: "",
  bio: "",
}

const UserForm = ({ profile: { profile, loading }, history }) => {
  const [formData, setFormData] = useState(initialState)
  const { institution, city, country, bio } = formData

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Create Profile")
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Editar Perfil</h1>
      <p className="lead">Agrega información</p>
      <small>* = campos requeridos</small>
      <form onSubmit={handleSubmit} className="form">
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
            placeholder="Una breve biografía tuya"
            name="bio"
            value={bio}
            onChange={handleChange}
          />
        </div>
      </form>
    </Fragment>
  )
}

//snippet rpt
UserForm.propTypes = {
  profile: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  }
}

export default connect(mapStateToProps)(UserForm)
