import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PrivateRoute from "./PrivateRoute";
import Alert from "../../components/layout/Alert";
import Auth from "./Auth";
import User from "./User";
import Events from "./Events";
import Admin from "./Admin";

const Routes = ({ isAuth }) => {
  return (
    <>
      <Alert />
      <main className="container-lg my-4">
        <Switch>
          <Route path="/events" component={Events} />
          <Route path="/auth" component={Auth} />
          <PrivateRoute path="/user" component={User} />
          <PrivateRoute path="/admin" component={Admin} roles="Admin" />
        </Switch>
      </main>
    </>
  );
};

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Routes);
