import React from "react";
import { Route, Switch } from "react-router-dom";
import TeamForm from "../teams-form/TeamForm";
import TeamEdit from "../teams-form/TeamEdit";
import TeamGridPage from "./TeamGridPage";

const Teams = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={TeamGridPage} />
      <Route path={`${path}/add`} component={TeamForm} />
      <Route path={`${path}/edit/:id`} component={TeamEdit} />
    </Switch>
  );
};

export default Teams;
