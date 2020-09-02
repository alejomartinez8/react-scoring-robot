import React, { Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { connect } from 'react-redux';
import { loadUser } from './redux/actions/user.actions';
import Routes from './components/routing/Routes';
import Layout from './pages/layout/Layout';
import Landing from './pages/landing/Landing';

const App = ({ loadUser }) => {
  loadUser();

  return (
    <BrowserRouter>
      <Fragment>
        <Layout>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route component={Routes} />
          </Switch>
        </Layout>
      </Fragment>
    </BrowserRouter>
  );
};

export default connect(null, { loadUser })(App);
