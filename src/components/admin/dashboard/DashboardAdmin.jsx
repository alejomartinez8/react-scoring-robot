import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Spinner from "../../layout/Spinner"

const DashboardAdmin = ({ auth: { userAuth, loading }, match }) => {
  const { path } = match
  return loading && userAuth === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard Admin</h1>
      <p>Panel de Administración</p>

      <div className="row mb-5">
        <div className="col-lg-3 m-1">
          <div className="card shadow h-100">
            <div className="card-header">
              <h2>Usuarios</h2>
            </div>

            <div className="card-body">
              <p>Crea y actualiza usuarios manualmente</p>
            </div>
            <div className="card-footer">
              <Link className="btn btn-primary" to={`${path}/users`}>
                Administrar Usuarios
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-3 m-1">
          <div className="card shadow h-100">
            <div className="card-header">
              <h2>Equipos</h2>
            </div>

            <div className="card-body">
              <p>Crea y actualiza equipos manualmente</p>
            </div>
            <div className="card-footer">
              <Link className="btn btn-primary" to={`${path}/teams`}>
                Administrar Equipos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-3 m-1">
          <div className="card shadow h-100">
            <div className="card-header">
              <h2>Eventos</h2>
            </div>

            <div className="card-body">
              <p>Crea y edita tus eventos</p>
            </div>
            <div className="card-footer">
              <Link className="btn btn-primary" to={`${path}/events`}>
                Administrar Eventos
              </Link>
            </div>
          </div>
        </div>

        <div className="col-lg-3 m-1">
          <div className="card shadow h-100">
            <div className="card-header">
              <h2>Retos</h2>
            </div>

            <div className="card-body">
              <p>Crea y edita los retos de eventos</p>
            </div>
            <div className="card-footer">
              <Link className="btn btn-primary" to={`${path}/challengues`}>
                Administrar Eventos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

DashboardAdmin.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapSateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapSateToProps)(DashboardAdmin)
