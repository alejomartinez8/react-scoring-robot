import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";

const PrivateRoute = ({
  component: Component,
  roles,
  auth: { isAuth, loading, userAuth },
  ...rest
}) => {
  // console.log(roles, roles.indexOf(userAuth.role));
  return (
    <Route
      {...rest}
      render={(props) => {
        // console.log({ loading })
        // console.log({ isAuth })

        if (loading) {
          return <Spinner />;
        } else {
          if (!isAuth) {
            // not logged-in, then redirect to login page with the return url
            return <Redirect to="/auth/login" />;
          }

          // check if route is restricted by role
          if (roles && roles.indexOf(userAuth.role) === -1) {
            return <Redirect to={{ pathname: "/" }} />;
          }

          // athorized so return component
          return <Component {...props} />;
        }
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
