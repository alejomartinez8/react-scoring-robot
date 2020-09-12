import React, { useEffect } from "react";
import { connect } from "react-redux";
import { teamActions } from "../../../redux/actions";
import TeamForm from "./TeamForm";

const TeamEdit = ({ team: { team }, getTeamById, match }) => {
  useEffect(() => {
    getTeamById(match.params.id);
  }, [getTeamById, match.params.id]);

  return <TeamForm team={team} />;
};

const mapStateToProps = (state) => ({
  team: state.team,
});

const actionCreators = {
  getTeamById: teamActions.getTeamById,
};

export default connect(mapStateToProps, actionCreators)(TeamEdit);
