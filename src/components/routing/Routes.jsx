import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Pages

import Events from '../../pages/events/Events';
import User from '../../pages/user/User';

const Routes = ({ isAuth }) => {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/events' component={Events} />
        <Route path='/user' component={User} />
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
