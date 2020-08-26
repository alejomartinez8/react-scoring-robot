import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Events from '../../pages/events/Events';
import Login from '../../pages/accounts/Login';
import Register from '../../pages/accounts/Register';
import ForgotPassword from '../../pages/accounts/ForgotPassword';
import ResetPassword from '../../pages/accounts/ResetPassword';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/events' component={Events} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Route exact path='/forgot-password' component={ForgotPassword} />
      <Route exact path='/reset-password' component={ResetPassword} />
    </Switch>
  );
};

export default Routes;
