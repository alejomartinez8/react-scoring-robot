import React, { useEffect } from "react";
import { connect } from "react-redux";
import { challengeActions } from "../../../redux/actions";
import ChallengeForm from "./ChallengeForm";

const ChallengeEdit = ({ challenge: { challenge }, getChallengeById, match }) => {
  useEffect(() => {
    getChallengeById(match.params.id);
  }, [getChallengeById, match.params.id]);

  return <ChallengeForm challenge={challenge} />;
};

const mapStateToProps = (state) => ({
  challenge: state.challenge,
});

const actionCreators = {
  getChallengeById: challengeActions.getChallengeById,
};

export default connect(mapStateToProps, actionCreators)(ChallengeEdit);
