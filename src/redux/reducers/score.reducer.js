import { ScoreTypes } from "../constants/ScoreTypes";

const intialState = {
  loading: false,
  score: {},
  scores: [],
  error: [],
};

export function score(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ScoreTypes.GET_SCORE:
    case ScoreTypes.GET_SCORES:
      return {
        ...state,
        loading: true,
      };

    case ScoreTypes.SCORES_LOADED:
      return {
        ...state,
        loading: false,
        score: {},
        scores: payload,
        error: [],
      };

    case ScoreTypes.SCORE_LOADED:
      return {
        ...state,
        loading: false,
        score: payload,
        scores: [],
        error: [],
      };

    case ScoreTypes.SCORE_DELETE:
      return {
        ...state,
        scores: state.scores.map((score) =>
          score.id === payload ? { ...score, deleting: true } : score
        ),
      };

    case ScoreTypes.CLEAR_SCORES:
      return {
        ...state,
        loading: false,
        score: {},
        scores: [],
      };

    case ScoreTypes.SCORE_ERROR:
      return {
        ...state,
        loading: false,
        score: {},
        scores: [],
        error: payload,
      };

    default:
      return state;
  }
}
