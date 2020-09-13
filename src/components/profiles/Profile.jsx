import React from "react";
import { Route, Switch } from "react-router-dom";
import ProfileForm from "./ProfileForm";
import ProfileDetail from "./ProfileDetail";

const Profile = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <Route exact path={path} component={ProfileDetail} />
      <Route path={`${path}/edit-profile`} component={ProfileForm} />
    </Switch>
  );
};

export default Profile;
