import React from "react";
import { Route, Switch } from "react-router-dom";
import TeamsList from "./TeamList";
import TeamForm from "./TeamForm";
import TeamEdit from "./TeamEdit";

const Teams = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={TeamsList} />
      <Route path={`${path}/add`} component={TeamForm} />
      <Route path={`${path}/edit/:id`} component={TeamEdit} />
    </Switch>
  );
};

export default Teams;
