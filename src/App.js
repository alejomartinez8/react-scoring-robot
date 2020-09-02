import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import { connect } from "react-redux";
import { loadUser } from "./redux/actions/user.actions";
import Routes from "./components/routing/Routes";

const App = ({ loadUser }) => {
  loadUser();

  return (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route component={Routes} />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
};

export default connect(null, { loadUser })(App);
