import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteUser } from "../../redux/actions/user.actions";
import { teamActions } from "../../redux/actions";
import Spinner from "../layout/Spinner";
import UserCard from "./UserCard";
import TeamsGrid from "../teams/TeamsGrid";

const UserPage = ({ auth, team, getTeams, match }) => {
  const { path } = match;
  console.log(auth);

  useEffect(() => {
    if ((auth.role = "User")) {
      getTeams({ "user._id": auth.id });
    }
  }, [getTeams]);

  const onDelete = () => {
    deleteUser(auth.id);
  };

  return auth === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h2 className="text-primary my-3">Perfil</h2>
      <UserCard auth={auth} path={path} onDelete={onDelete} auth={auth} />
      <hr s />
      <h2 className="text-primary my-3">Mis Equipos</h2>
      <Link to="/user/teams/add" className="btn btn-primary my-2">
        Agregar Equipo
      </Link>
      <TeamsGrid teams={team.teams} loading={team.loading} auth={auth} />
    </Fragment>
  );
};

const mapSateToProps = (state) => ({
  auth: state.auth.userAuth,
  team: state.team,
});

const actionCreator = {
  deleteUser,
  getTeams: teamActions.getTeams,
};

export default connect(mapSateToProps, actionCreator)(UserPage);
