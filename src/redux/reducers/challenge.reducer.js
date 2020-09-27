import { ChallengeTypes } from "../constants/ChallengeTypes";

const intialState = {
  loading: false,
  challenge: {},
  challenges: [],
  error: [],
};

export function challenge(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ChallengeTypes.GET_CHALLENGE:
    case ChallengeTypes.GET_CHALLENGES:
      return {
        ...state,
        loading: true,
      };

    case ChallengeTypes.CHALLENGES_LOADED:
      return {
        ...state,
        loading: false,
        challenge: {},
        challenges: payload,
        error: [],
      };

    case ChallengeTypes.CHALLENGE_LOADED:
      return {
        ...state,
        loading: false,
        challenge: payload,
        challenges: [],
        error: [],
      };

    case ChallengeTypes.CHALLENGE_DELETE:
      return {
        ...state,
        challenges: state.challenges.map((challenge) =>
          challenge.id === payload ? { ...challenge, deleting: true } : challenge
        ),
      };

    case ChallengeTypes.CLEAR_CHALLENGES:
      return {
        ...state,
        loading: false,
        challenge: {},
        challenges: [],
      };

    case ChallengeTypes.CHALLENGE_ERROR:
      return {
        ...state,
        loading: false,
        challenge: {},
        challenges: [],
        error: payload,
      };

    default:
      return state;
  }
}
