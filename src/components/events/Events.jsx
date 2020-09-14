import React from "react";
import { Route, Switch } from "react-router-dom";
import EventsList from "./EventsList";
import EventPage from "./EventPage";

const Events = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={EventsList} />
      <Route path={`${path}/:shortName`} component={EventPage} />
    </Switch>
  );
};

export default Events;
