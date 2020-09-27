import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

// Pages

import PrivateRoute from "./PrivateRoute";
import Alert from "../../components/layout/Alert";
import Auth from "./Auth";
import User from "./User";
import Admin from "./Admin";
import Events from "./Events";

const Routes = () => {
  return (
    <div className="container mt-4">
      <Alert />
      <Switch>
        {/* Events */}
        <Route path="/events" component={Events} />
        {/* Admin */}
        <PrivateRoute path="/admin" component={Admin} roles="Admin" />
        {/* User */}
        <PrivateRoute path="/user" component={User} />
        {/* Auth */}
        <Route path="/auth" component={Auth} />
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
