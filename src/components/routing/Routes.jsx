import React from "react"
import { Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// Pages

import PrivateRoute from "./PrivateRoute"
import Layout from "../../pages/layout/Layout"
import Landing from "../../pages/landing/Landing"
import User from "../../pages/users/User"
import Dashboard from "../../pages/dashboard/Dashboard"
import Events from "../../pages/events/Events"
import UserForm from "../../pages/profiles/UserForm"

const Routes = ({ isAuth }) => {
  return (
    <Layout>
      {isAuth ? (
        <div className="container mt-4">
          <Switch>
            <Route path="/user" component={User} />
            <Route exact path="/" component={Events} />
            <Route exact path="/events" component={Events} />
            <PrivateRoute path="/dashboard" component={Dashboard} />
            <PrivateRoute path="/create-profile" component={UserForm} />
          </Switch>
        </div>
      ) : (
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/events" component={Events} />
          <Route path="/user" component={User} />
        </Switch>
      )}
    </Layout>
  )
}

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(Routes)
