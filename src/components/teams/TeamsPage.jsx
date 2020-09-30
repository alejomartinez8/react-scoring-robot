import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { teamActions } from "../../redux/actions";
import TeamsGrid from "../teams/TeamsGrid";

const TeamsPage = ({ auth, team, getTeams }) => {
  useEffect(() => {
    if ((auth.role = "User")) {
      getTeams({ user: auth.id });
    }
  }, [getTeams, auth.role, auth.id]);

  return (
    <div>
      <h2 className="text-primary my-3">Mis Equipos</h2>
      <Link to="/user/teams/add" className="btn btn-primary my-2">
        Agregar Equipo
      </Link>
      <TeamsGrid teams={team.teams} loading={team.loading} auth={auth} />
    </div>
  );
};

const mapSateToProps = (state) => ({
  auth: state.auth.userAuth,
  team: state.team,
});

const actionCreator = {
  getTeams: teamActions.getTeams,
};

export default connect(mapSateToProps, actionCreator)(TeamsPage);
