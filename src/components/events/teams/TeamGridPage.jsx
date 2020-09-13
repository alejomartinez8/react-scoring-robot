import React, { Fragment, useEffect } from "react";
import TeamItem from "./TeamItem";
import { connect } from "react-redux";
import { teamActions } from "../../../redux/actions";

const TeamGridPage = ({ team: { teams }, getAllTeams }) => {
  useEffect(() => {
    getAllTeams();
  }, [getAllTeams]);

  return (
    <Fragment>
      <h1 className="large text-primary">Equipos</h1>

      <div className="row">
        {teams.length > 0 ? (
          teams.map((team) => <TeamItem key={team.id} team={team} />)
        ) : (
          <h4>Todavía no hay teamos</h4>
        )}
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  team: state.team,
});

const actionCreators = {
  getAllTeams: teamActions.getAllTeams,
};

export default connect(mapStateToProps, actionCreators)(TeamGridPage);
