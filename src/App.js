import React, { useEffect, Fragment } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import { store } from './helpers';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/user.actions';
import setAuthToken from './helpers/setAuthToken';

import Routes from './components/routing/Routes';
import Layout from './pages/layout/Layout';
import Landing from './pages/landing/Landing';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default App;
