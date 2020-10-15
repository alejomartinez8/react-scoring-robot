import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Login from "../auth/Login";
import Register from "../auth/Register";
import VerifyEmail from "../auth/VerifyEmail";
import ForgotPassword from "../auth/ForgotPassword";
import ResetPassword from "../auth/ResetPassword";

const Auth = ({ history, match, isAuth }) => {
  const { path } = match;

  useEffect(() => {
    if (isAuth) {
      history.push("/events");
    }
  }, [isAuth, history]);

  return (
    <Switch>
      <Route path={`${path}/login`} component={Login} />
      <Route path={`${path}/register`} component={Register} />
      <Route path={`${path}/verify-email`} component={VerifyEmail} />
      <Route path={`${path}/forgot-password`} component={ForgotPassword} />
      <Route path={`${path}/reset-password`} component={ResetPassword} />
    </Switch>
  );
};

Auth.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps)(Auth);
