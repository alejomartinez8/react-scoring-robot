import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import UserForm from "../admin/users/UserForm";
import UserPage from "../user/UserPage";
import TeamForm from "../teams/TeamForm";

const User = ({ match }) => {
  return (
    <Switch>
      <PrivateRoute exact path="/user" component={UserPage} />
      <PrivateRoute exact path={"/user/edit/:id"} component={UserForm} />
      <PrivateRoute exact path={"/user/teams/add"} component={TeamForm} />
      <PrivateRoute exact path={"/user/teams/edit/:id"} component={TeamForm} />
    </Switch>
  );
};

export default User;
