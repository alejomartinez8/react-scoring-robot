import React from "react";
import { Route, Switch } from "react-router-dom";
import EventGrid from "./EventsGrid";
import EventDetail from "./EventDetail";

const Events = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={EventGrid} />
      <Route path={`${path}/:shortName`} component={EventDetail} />
    </Switch>
  );
};

export default Events;
