import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { layoutActions, userActions } from "./redux/actions";
import Routes from "./components/routing/Routes";
import Landing from "./components/layout/Landing";
import Topbar from "./components/layout/Topbar";
import Sidebar from "./components/layout/Sidebar";

const App = ({ loadUser, toggleSidenav, toggleSidenavAction }) => {
  if (localStorage.getItem("token")) {
    loadUser();
  }

  return (
    <BrowserRouter>
      <Fragment>
        <div className={toggleSidenav ? "sidenav-toggled" : ""}>
          <Topbar
            toggleSidenav={toggleSidenav}
            toggleSidenavAction={toggleSidenavAction}
          />
          <div id="layoutSidenav">
            <Sidebar />
            <div id="content">
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route component={Routes} />
              </Switch>
            </div>
          </div>
        </div>
      </Fragment>
    </BrowserRouter>
  );
};

const mapStateToPros = (state) => ({
  toggleSidenav: state.layout.toggleSidenav,
});

const actionCreators = {
  loadUser: userActions.loadUser,
  toggleSidenavAction: layoutActions.toggleSidenavAction,
};

export default connect(mapStateToPros, actionCreators)(App);
