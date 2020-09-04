import React from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Spinner } from "../../components/layout/Spinner"
import { deleteUser } from "../../redux/actions/user.actions"

const ProfileDetail = ({ auth: { user, loading }, deleteUser, match }) => {
  const { path } = match

  const onDelete = () => {
    console.log("Delete User")
    deleteUser(user.id)
  }

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
        <button
          onClick={onDelete}
          type="button"
          className="btn btn-danger m-1"
          disabled={loading}
        >
          {loading ? (
            <span className="spinner-border spinner-border-sm m-1"></span>
          ) : (
            <i className="fas fa-user-minus"></i>
          )}
          Eliminar Cuenta
        </button>
      </div>
    </div>
  )
}

ProfileDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  deleteUser: PropTypes.func.isRequired,
}

const mapSateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapSateToProps, { deleteUser })(ProfileDetail)
