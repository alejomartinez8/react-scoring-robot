import { challengeServices } from "../services";
import { setAlert } from "./alert.actions";
import { ChallengeTypes } from "../constants";

const addChallenge = (challenge) => (dispatch) => {
  challengeServices
    .addChallenge(challenge)
    .then(() => {
      dispatch(setAlert("Reto creado", "success"));
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const updateChallenge = (id, challenge) => (dispatch) => {
  challengeServices
    .updateChallenge(id, challenge)
    .then((challenge) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_LOADED, payload: challenge });
      dispatch(setAlert("Reto actualizado", "success"));
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const getAllChallenges = () => (dispatch) => {
  dispatch({ type: ChallengeTypes.GET_CHALLENGE });

  challengeServices
    .getAllChallenges()
    .then((challenges) => {
      dispatch({ type: ChallengeTypes.CHALLENGES_LOADED, payload: challenges });
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
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
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const deleteChallenge = (id) => (dispatch) => {
  challengeServices
    .deleteChallenge(id)
    .then(() => {
      dispatch({ type: ChallengeTypes.CHALLENGE_DELETE, payload: id });
      dispatch(setAlert("Reto Eliminado", "success"));
      dispatch(getAllChallenges());
    })
    .catch((error) => {
      dispatch({ type: ChallengeTypes.CHALLENGE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

export const challengeActions = {
  addChallenge,
  updateChallenge,
  getAllChallenges,
  getChallengeById,
  deleteChallenge,
};
