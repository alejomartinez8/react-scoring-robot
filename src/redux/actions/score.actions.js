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

const getAllScores = () => (dispatch) => {
  dispatch({ type: ScoreTypes.GET_SCORE });

  scoreServices
    .getAllScores()
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
      dispatch(getAllScores());
    })
    .catch((error) => {
      dispatch({ type: ScoreTypes.SCORE_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

export const scoreActions = {
  sendScore,
  getAllScores,
  getScoreById,
  deleteScore,
};
