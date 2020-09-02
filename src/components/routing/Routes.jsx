import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Pages

import PrivateRoute from './PrivateRoute';
import User from '../../pages/users/User';
import Profile from '../../pages/profiles/Profile';
import Events from '../../pages/events/Events';

const Routes = ({ isAuth }) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/events' component={Events} />
        <Route path='/user' component={User} />
        <PrivateRoute path='/profile' component={Profile} />
        {/* <Redirect from='*' to='/' /> */}
      </Switch>
    </Fragment>
  );
};

Routes.propTypes = {
  isAuth: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth
});

export default connect(mapStateToProps)(Routes);
