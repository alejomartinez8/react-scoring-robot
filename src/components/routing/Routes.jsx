import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Pages
import Layout from '../../pages/layout/Layout';
import Landing from '../../pages/Landing/Landig';
import Events from '../../pages/events/Events';
import User from '../../pages/user/User';

const Routes = ({ isAuth }) => {
  return (
    <Fragment>
      <Layout>
        <Switch>
          <Route exact path='/' component={Landing} />
          <Route exact path='/events' component={Events} />
          <Route path='/user' component={User} />
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
