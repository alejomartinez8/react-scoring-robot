import { scoreServices } from "../services";
import { setAlert } from "./alert.actions";
import { ScoreTypes } from "../constants";

const sendScore = (score) => (dispatch) => {
  scoreServices
    .sendScore(score)
    .then(() => {
      dispatch(setAlert("Puntaje Enviado", "success"));
    })
    .catch((error) => {
      dispatch({ type: ScoreTypes.SCORE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const getScores = (params) => (dispatch) => {
  dispatch({ type: ScoreTypes.GET_SCORES });

  scoreServices
    .getScores(params)
    .then((scores) => {
      dispatch({ type: ScoreTypes.SCORES_LOADED, payload: scores });
    })
    .catch((error) => {
      dispatch({ type: ScoreTypes.SCORE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const getScoreById = (id) => (dispatch) => {
  dispatch({ type: ScoreTypes.GET_SCORE });

  scoreServices
    .getScoreById(id)
    .then((score) => {
      dispatch({ type: ScoreTypes.SCORE_LOADED, payload: score });
    })
    .catch((error) => {
      dispatch({ type: ScoreTypes.SCORE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const deleteScore = (id) => (dispatch) => {
  scoreServices
    .deleteScore(id)
    .then(() => {
      dispatch({ type: ScoreTypes.SCORE_DELETE, payload: id });
      dispatch(setAlert("Reto Eliminado", "success"));
      dispatch(getScores());
    })
    .catch((error) => {
      dispatch({ type: ScoreTypes.SCORE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

export const scoreActions = {
  sendScore,
  getScores,
  getScoreById,
  deleteScore,
};
