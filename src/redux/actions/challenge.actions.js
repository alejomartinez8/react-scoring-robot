import { challengeServices } from "../services";
import { alertActions } from "./alert.actions";
import { ChallengeTypes } from "../constants";

const addChallenge = (challenge) => (dispatch) => {
  challengeServices
    .addChallenge(challenge)
    .then(() => {
      dispatch(alertActions.setAlert("Reto creado", "success"));
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const updateChallenge = (id, challenge) => (dispatch) => {
  challengeServices
    .updateChallenge(id, challenge)
    .then((challenge) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_LOADED, payload: challenge });
      dispatch(alertActions.setAlert("Reto actualizado", "success"));
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const getChallenges = (query) => (dispatch) => {
  dispatch({ type: ChallengeTypes.GET_CHALLENGE });

  challengeServices
    .getChallenges(query)
    .then((challenges) => {
      dispatch({ type: ChallengeTypes.CHALLENGES_LOADED, payload: challenges });
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const getChallengeById = (id) => (dispatch) => {
  dispatch({ type: ChallengeTypes.GET_CHALLENGE });

  challengeServices
    .getChallengeById(id)
    .then((challenge) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_LOADED, payload: challenge });
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const getChallengeBySlug = (slug) => (dispatch) => {
  dispatch({ type: ChallengeTypes.GET_CHALLENGE });

  challengeServices
    .getChallengeBySlug(slug)
    .then((challenge) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_LOADED, payload: challenge });
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const deleteChallenge = (id) => (dispatch) => {
  challengeServices
    .deleteChallenge(id)
    .then((res) => {
      if (res.type === "delete-success") {
        dispatch(
          alertActions.setAlert(`Reto ${res.challenge.name} eliminado`, "success")
        );
        dispatch(getChallenges());
      } else {
        dispatch(alertActions.setAlert(res.message, "warning"));
      }
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

export const challengeActions = {
  addChallenge,
  updateChallenge,
  getChallenges,
  getChallengeById,
  getChallengeBySlug,
  deleteChallenge,
};
