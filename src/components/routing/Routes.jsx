import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Pages

import PrivateRoute from "./PrivateRoute";
import Alert from "../../components/layout/Alert";
import User from "../user/User";
import Profile from "../profiles/Profile";
import Admin from "../admin/Admin";
import Events from "../events/Events";
import TeamGridPage from "../teams/TeamGridPage";

const Routes = () => {
  return (
    <div className="container mt-4">
      <Alert />
      <Switch>
        {/* Events */}
        <Route path="/events" component={Events} />
        {/* Teams */}
        <PrivateRoute path="/teams" component={TeamGridPage} />
        {/* Admin */}
        <PrivateRoute path="/admin" component={Admin} roles="Admin" />
        {/* Profile */}
        <PrivateRoute path="/profile" component={Profile} />
        {/* Auth */}
        <Route path="/user" component={User} />
      </Switch>
    </div>
  );
};

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Routes);
