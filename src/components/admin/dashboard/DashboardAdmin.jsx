import React, { Fragment, useEffect } from "react";
import { connect } from "react-redux";
import { Spinner } from "react-bootstrap";
import DashboardAdminItem from "./DashboardAdminItem";
import {
  challengeActions,
  teamActions,
  userActions,
  eventActions,
} from "../../../redux/actions";

const DashboardAdmin = ({
  auth: { userAuth },
  events,
  challenges,
  users,
  teams,
  match,
  getEvents,
  getChallenges,
  getUsers,
  getTeams,
}) => {
  const { path } = match;

  useEffect(() => {
    getEvents();
    getChallenges();
    getUsers();
    getTeams();
    // eslint-disable-next-line
  }, []);

  return events === [] && challenges === [] && users === [] && teams === [] ? (
    <Spinner animation="border" variant="primary" />
  ) : (
    <Fragment>
      <h2 className="text-primary">
        <i className="fas fa-tachometer"></i> Dashboard
      </h2>
      <div className="row">
        <DashboardAdminItem
          title="Eventos"
          description="Crea y actualiza eventos manualmente"
          actionPath={`${path}/events`}
          actionDescription="Administrar"
          icon="fas fa-calendar"
          indicator={events.length}
        />

        <DashboardAdminItem
          title="Retos"
          description="Crea y actualiza retos manualmente"
          actionPath={`${path}/challenges`}
          actionDescription="Administrar"
          icon="fas fa-trophy"
          indicator={challenges.length}
        />

        <DashboardAdminItem
          title="Usuarios"
          description="Crea y actualiza usuarios manualmente"
          actionPath={`${path}/users`}
          actionDescription="Administrar"
          icon="fas fa-user"
          indicator={users.length}
        />

        <DashboardAdminItem
          title="Equipos"
          description="Crea y actualiza equipos manualmente"
          actionPath={`${path}/teams`}
          actionDescription="Administrar"
          icon="fas fa-users"
          indicator={teams.length}
        />
      </div>
    </Fragment>
  );
};

const mapSateToProps = (state) => ({
  auth: state.auth,
  users: state.user.users,
  events: state.event.events,
  challenges: state.challenge.challenges,
  teams: state.team.teams,
});

const actionCreators = {
  getEvents: eventActions.getEvents,
  getUsers: userActions.getUsers,
  getChallenges: challengeActions.getChallenges,
  getTeams: teamActions.getTeams,
};

export default connect(mapSateToProps, actionCreators)(DashboardAdmin);
