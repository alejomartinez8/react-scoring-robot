import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import TeamCard from "./TeamCard";
import { connect } from "react-redux";
import { teamActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import ButtonBack from "../layout/ButtonBack";

const TeamGridPage = ({
  auth,
  team: { teams, loading },
  getAllTeams,
  isUserProfile = false,
  title = "Todos los Equipos",
}) => {
  useEffect(() => {
    getAllTeams();
  }, [getAllTeams]);

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
});

const actionCreators = {
  getAllTeams: teamActions.getAllTeams,
};

export default connect(mapStateToProps, actionCreators)(TeamGridPage);
