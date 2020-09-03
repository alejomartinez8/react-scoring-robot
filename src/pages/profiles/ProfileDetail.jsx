import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Spinner } from "../../components/layout/Spinner"

const ProfileDetail = ({ auth: { user, loading }, match }) => {
  const { path } = match

  return loading && user === null ? (
    <Spinner />
  ) : (
    <div className="card shadow">
      <div className="card-header">
        <h2 className="card-title">
          {user.firstName} {user.lastName}
        </h2>
      </div>

      <div className="card-body">
        <div className="row">
          <p className="col-md-3">Email:</p>
          <p className="col-md-6">{user.email}</p>
        </div>

        <div className="row">
          <p className="col-md-3">Institución Educativa:</p>
          <p className="col-md-6">{user.institution}</p>
        </div>

        <div className="row">
          <p className="col-md-3">Ciudad:</p>
          <p className="col-md-6">{user.city}</p>
        </div>

        <div className="row">
          <p className="col-md-3">País:</p>
          <p className="col-md-6">{user.country}</p>
        </div>

        <div className="row">
          <p className="col-md-3">Acerca de mí:</p>
          <p className="col-md-6">{user.bio}</p>
        </div>
      </div>

      <div className="card-footer">
        <Link to={`${path}/edit-profile`} className="btn btn-primary">
          <i className="fas fa-user"></i> Editar Perfil
        </Link>
        <button className="btn btn-danger">
          <i className="fas fa-user-minus"></i> Eliminar Cuenta
        </button>
      </div>
    </div>
  )
}

ProfileDetail.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapSateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapSateToProps)(ProfileDetail)
