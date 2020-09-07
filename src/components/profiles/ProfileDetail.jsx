import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Spinner from "../../components/layout/Spinner"
import { deleteUser } from "../../redux/actions/user.actions"

const ProfileDetail = ({ auth: { userAuth, loading }, deleteUser, match }) => {
  const { path } = match

  const onDelete = () => {
    console.log("Delete User")
    deleteUser(userAuth.id)
  }

  return loading && userAuth === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Mi Perfil</h1>
      <div className="card shadow">
        <div className="card-header">
          <h2 className="card-title">
            Nombre: {userAuth.firstName} {userAuth.lastName}
          </h2>
        </div>

        <div className="card-body">
          <div className="row">
            <p className="col-md-3">Email:</p>
            <p className="col-md-6">{userAuth.email}</p>
          </div>

          <div className="row">
            <p className="col-md-3">Institución Educativa:</p>
            <p className="col-md-6">{userAuth.institution}</p>
          </div>

          <div className="row">
            <p className="col-md-3">Ciudad:</p>
            <p className="col-md-6">{userAuth.city}</p>
          </div>

          <div className="row">
            <p className="col-md-3">País:</p>
            <p className="col-md-6">{userAuth.country}</p>
          </div>

          <div className="row">
            <p className="col-md-3">Acerca de mí:</p>
            <p className="col-md-6">{userAuth.bio}</p>
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
    </Fragment>
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
