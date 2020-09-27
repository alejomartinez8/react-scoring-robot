import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardAdmin from "../admin/dashboard/DashboardAdmin";
import UserList from "../admin/users/UserList";
import UserForm from "../admin/users/UserForm";
import EventsList from "../admin/events/EventsList";
import EventForm from "../admin/events/EventForm";
import ChallengesList from "../admin/challenges/ChallengeList";
import ChallengeForm from "../admin/challenges/ChallengeForm";
import TeamsList from "../admin/teams/TeamList";
import TeamForm from "../teams-form/TeamForm";

const Admin = ({ match }) => {
  return (
    <Switch>
      <Route exact path="/admin" component={DashboardAdmin} />
      {/* Users */}
      <Route exact path={"/admin/users"} component={UserList} />
      <Route exact path={"/admin/users/add"} component={UserForm} />
      <Route exact path={"/admin/users/edit/:id"} component={UserForm} />
      {/* Events */}
      <Route exact path={"/admin/events"} component={EventsList} />
      <Route exact path={"/admin/events/add"} component={EventForm} />
      <Route exact path={"/admin/events/edit/:id"} component={EventForm} />
      {/* Challenges */}
      <Route exact path={"/admin/challenges"} component={ChallengesList} />
      <Route exact path={"/admin/challenges/add"} component={ChallengeForm} />
      <Route exact path={"/admin/challenges/edit/:id"} component={ChallengeForm} />
      {/* Teams */}
      <Route exact path={"/admin/teams"} component={TeamsList} />
      <Route exact path={"/admin/teams/add"} component={TeamForm} />
      <Route exact path={"/admin/teams/edit/:id"} component={TeamForm} />
    </Switch>
  );
};

export default Admin;
