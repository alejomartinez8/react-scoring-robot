import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Events from '../../views/events/Events';

const Routes = () => {
  return (
    <section className='container'>
      <Switch>
        <Route exact path='/events' component={Events} />
      </Switch>
    </section>
  );
};

export default Routes;
