import { TeamTypes } from "../constants/TeamTypes";

const intialState = {
  loading: false,
  team: {},
  teams: [],
  error: [],
};

export function team(state = intialState, action) {
  const { type, payload } = action;
  console.log({ payload });

  switch (type) {
    case TeamTypes.GET_TEAM:
    case TeamTypes.GET_TEAMS:
      return {
        ...state,
        loading: true,
      };

    case TeamTypes.TEAMS_LOADED:
      return {
        ...state,
        loading: false,
        team: {},
        teams: payload,
        error: [],
      };

    case TeamTypes.TEAM_LOADED:
      return {
        ...state,
        loading: false,
        team: payload,
        teams: [],
        error: [],
      };

    case TeamTypes.TEAM_DELETE:
      return {
        ...state,
        teams: state.teams.map((team) =>
          team.id === payload ? { ...team, deleting: true } : team
        ),
      };

    case TeamTypes.CLEAR_TEAMS:
      return {
        ...state,
        loading: false,
        team: {},
        teams: [],
      };

    case TeamTypes.TEAM_ERROR:
      return {
        ...state,
        loading: false,
        team: {},
        teams: [],
        error: payload,
      };

    default:
      return state;
  }
}
