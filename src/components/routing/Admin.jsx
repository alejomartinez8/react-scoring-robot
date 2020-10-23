import React from "react";
import { Route, Switch } from "react-router-dom";
import DashboardAdmin from "../admin/dashboard/DashboardAdmin";
import UserList from "../users/admin/UserList";
import UserForm from "../users/admin/UserForm";
import EventsList from "../events/admin/EventsList";
import EventForm from "../events/admin/EventForm";
import ChallengesList from "../challenges/admin/ChallengeList";
import ChallengeForm from "../challenges/admin/ChallengeForm";
import TeamsList from "../teams/admin/TeamList";
import TeamForm from "../teams/TeamForm";

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
