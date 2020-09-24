import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import TeamCard from "./TeamCard";
import { connect } from "react-redux";
import { teamActions, eventActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import ButtonBack from "../layout/ButtonBack";

const TeamsGrid = ({
  auth,
  event,
  getEventBySlug,
  team: { teams, loading },
  getTeams,
  isUserProfile = false,
  title = "Todos los Equipos",
  match,
}) => {
  useEffect(() => {
    if (!isUserProfile) {
      getEventBySlug(match.params.eventSlug);
    }
    // eslint-disable-next-line
  }, [getEventBySlug]);

  useEffect(() => {
    // console.log(event.loading);
    if (!event.loading) {
      getTeams({ event: event.event._id });
    }
  }, [getTeams, event.loading, event.event._id]);

  useEffect(() => {
    if (isUserProfile) {
      getTeams();
    }
  }, [isUserProfile, getTeams]);

  const filteredTeams = isUserProfile
    ? teams.filter((team) => team.user.id === auth.userAuth.id)
    : teams;

  return (
    <Fragment>
      <h2 className="text-primary">{title}</h2>
      <ButtonBack className="btn btn-secondary m-1">Atrás</ButtonBack>
      {(auth.userAuth.role === "Admin" || auth.userAuth.role === "User") && (
        <Link to={`/teams/add`} className="btn btn-outline-success">
          Agregar Equipo
        </Link>
      )}

      {loading ? (
        <Spinner />
      ) : (
        <div className="row my-2">
          {filteredTeams.length > 0 ? (
            filteredTeams.map((team) => (
              <TeamCard key={team._id} team={team} auth={auth} />
            ))
          ) : (
            <h4>Todavía no hay equipos</h4>
          )}
        </div>
      )}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  team: state.team,
  event: state.event,
});

const actionCreators = {
  getTeams: teamActions.getTeams,
  getEventBySlug: eventActions.getEventBySlug,
};

export default connect(mapStateToProps, actionCreators)(TeamsGrid);
