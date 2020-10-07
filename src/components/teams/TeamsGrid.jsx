import React, { Fragment } from "react";
import TeamCard from "./TeamCard";
import { Spinner } from "react-bootstrap";

const TeamsGrid = ({ auth, teams = [], loading }) => {
  return (
    <Fragment>
      {loading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <div className="row my-4">
          {teams.length > 0 ? (
            teams.map((team) => <TeamCard key={team._id} team={team} auth={auth} />)
          ) : (
            <h4>Todavía no hay equipos</h4>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default TeamsGrid;
