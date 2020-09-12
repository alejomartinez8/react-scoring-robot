import React from "react";
import { Route, Switch } from "react-router-dom";
import EventsList from "./EventsList";
import EventForm from "./EventForm";
import EventEdit from "./EventEdit";

const Events = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={EventsList} />
      <Route path={`${path}/add`} component={EventForm} />
      <Route path={`${path}/edit/:id`} component={EventEdit} />
    </Switch>
  );
};

export default Events;
