import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserForm from "../users/admin/UserForm";
import UserPage from "../users/UserPage";
import TeamForm from "../teams/TeamForm";
import TeamsPage from "../teams/TeamsPage";

const User = ({ match }) => {
  return (
    <Switch>
      <PrivateRoute exact path="/user" component={UserPage} />
      <PrivateRoute exact path={"/user/edit/:id"} component={UserForm} />
      <PrivateRoute exact path={"/user/teams"} component={TeamsPage} />
      <PrivateRoute exact path={"/user/teams/add"} component={TeamForm} />
      <PrivateRoute exact path={"/user/teams/edit/:id"} component={TeamForm} />
    </Switch>
  );
};

export default User;
