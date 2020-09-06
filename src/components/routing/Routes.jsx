import React from "react"
import { Route, Switch } from "react-router-dom"
import PropTypes from "prop-types"
import { connect } from "react-redux"

// Pages

import PrivateRoute from "./PrivateRoute"
import Alert from "../../components/layout/Alert"
import User from "../user/User"
import Profile from "../profiles/Profile"
import Admin from "../admin/Admin"
import EventsListPage from "../events/EventsListPage"

const Routes = () => {
  return (
    <div className="container mt-4">
      <Alert />
      <Switch>
        <Route exact path="/events" component={EventsListPage} />
        <Route path="/admin" component={Admin} />
        <PrivateRoute path="/profile" component={Profile} />
        <Route path="/user" component={User} />
      </Switch>
    </div>
  )
}

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
})

export default connect(mapStateToProps)(Routes)
