import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import { store } from './helpers';
import { Provider } from 'react-redux';
import { loadUser } from './redux/actions/user.actions';
import setAuthToken from './helpers/setAuthToken';
import Routes from './components/routing/Routes';

const App = () => {
  useEffect(() => {
    setAuthToken(localStorage.token);
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Route component={Routes} />
      </Router>
    </Provider>
  );
};

export default App;
