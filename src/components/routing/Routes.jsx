import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Pages
import Layout from '../../pages/layout/Layout';
import Landing from '../../pages/Landing/Landig';
import Events from '../../pages/events/Events';
import Login from '../../pages/users/Login';
import Register from '../../pages/users/Register';
import ForgotPassword from '../../pages/users/ForgotPassword';
import ResetPassword from '../../pages/users/ResetPassword';

const Routes = ({ isAuth }) => {
  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/events' component={Events} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path='/forgot-password' component={ForgotPassword} />
          <Route exact path='/reset-password' component={ResetPassword} />
        </Switch>
      </Layout>
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
