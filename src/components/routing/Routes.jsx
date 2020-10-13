import React from "react";
import { Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Sidebar from "../layout/Sidebar";
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
      {isAuth ? (
        <div id="layoutSidenav">
          <Sidebar />
          <div id="content">
            <main className="container-xl my-4">
              <Switch>
                <Route path="/events" component={Events} />
                <PrivateRoute path="/admin" component={Admin} roles="Admin" />
                <PrivateRoute path="/user" component={User} />
                <Route path="/auth" component={Auth} />
              </Switch>
            </main>
          </div>
        </div>
      ) : (
        <div className="container-xl" style={{ marginTop: "100px" }}>
          <Switch>
            <Route path="/events" component={Events} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </div>
      )}
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
