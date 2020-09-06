import React, { Fragment } from "react"
import { Link } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import Spinner from "../../layout/Spinner"

const DashboardAdmin = ({ auth: { user, loading }, match }) => {
  const { path } = match
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard Admin</h1>
      <p>Panel de Administración</p>
      <p>
        <Link to={`${path}/users`}>Administrar Usuarios</Link>
      </p>
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
