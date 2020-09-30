import { teamServices } from "../services";
import { alertActions } from "./alert.actions";
import { TeamTypes } from "../constants";

const addTeam = (team) => (dispatch) => {
  teamServices
    .addTeam(team)
    .then(() => {
      dispatch(alertActions.setAlert("Equipo creado", "success"));
    })
    .catch((error) => {
      dispatch({ type: TeamTypes.TEAM_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const updateTeam = (id, team) => (dispatch) => {
  dispatch({ type: TeamTypes.UPDATE_TEAM });

  teamServices
    .updateTeam(id, team)
    .then((team) => {
      dispatch({ type: TeamTypes.TEAM_UPDATED, payload: team });
      dispatch(alertActions.setAlert("Equipo actualizado", "success"));
    })
    .catch((error) => {
      dispatch({ type: TeamTypes.TEAM_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const registerTeam = (id) => (dispatch) => {
  dispatch({ type: TeamTypes.REGISTER_TEAM });

  teamServices
    .registerTeam(id)
    .then((team) => {
      dispatch({ type: TeamTypes.TEAM_REGISTERED, payload: team });
    })
    .catch((error) => {
      dispatch({ type: TeamTypes.TEAM_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const getTeams = (query) => (dispatch) => {
  dispatch({ type: TeamTypes.GET_TEAMS });

  teamServices
    .getTeams(query)
    .then((teams) => {
      dispatch({ type: TeamTypes.TEAMS_LOADED, payload: teams });
    })
    .catch((error) => {
      dispatch({ type: TeamTypes.TEAM_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const getTeamById = (id) => (dispatch) => {
  dispatch({ type: TeamTypes.GET_TEAM });

  teamServices
    .getTeamById(id)
    .then((team) => {
      dispatch({ type: TeamTypes.TEAM_LOADED, payload: team });
    })
    .catch((error) => {
      dispatch({ type: TeamTypes.TEAM_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const deleteTeam = (id) => (dispatch) => {
  teamServices
    .deleteTeam(id)
    .then(() => {
      dispatch({ type: TeamTypes.TEAM_DELETE, payload: id });
      dispatch(alertActions.setAlert("Equipo Eliminado", "success"));
      dispatch(getTeams());
    })
    .catch((error) => {
      dispatch({ type: TeamTypes.TEAM_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

export const teamActions = {
  addTeam,
  updateTeam,
  registerTeam,
  getTeams,
  getTeamById,
  deleteTeam,
};
