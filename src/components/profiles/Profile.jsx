import React from "react";
import { Switch } from "react-router-dom";
import PrivateRoute from "../routing/PrivateRoute";
import ProfileForm from "./ProfileForm";
import ProfilePage from "./ProfilePage";
import TeamEdit from "../teams-form/TeamEdit";

const Profile = ({ match }) => {
  const { path } = match;
  return (
    <Switch>
      <PrivateRoute exact path={path} component={ProfilePage} />
      <PrivateRoute exact path={`${path}/edit-profile`} component={ProfileForm} />
      <PrivateRoute exact path={`${path}/teams/edit/:id`} component={TeamEdit} />
    </Switch>
  );
};

export default Profile;
