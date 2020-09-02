import React, { Fragment } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"
import { Spinner } from "../../components/layout/Spinner"

const Dashboard = ({ auth: { user, loading } }) => {
  return loading && user === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
    </Fragment>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapSateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapSateToProps)(Dashboard)
