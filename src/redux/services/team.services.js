import axios from "axios";

export const teamServices = {
  addTeam,
  updateTeam,
  registerTeam,
  getTeams,
  getTeamById,
  deleteTeam,
  addScoreToTeam,
};

async function addTeam(team) {
  return axios
    .post("/teams", JSON.stringify(team))
    .then(handleResponse)
    .catch(handleError);
}

async function updateTeam(id, team) {
  return axios
    .post(`/teams/${id}`, JSON.stringify(team))
    .then(handleResponse)
    .catch(handleError);
}

async function registerTeam(id) {
  return axios.put(`/teams/register/${id}`).then(handleResponse).catch(handleError);
}

async function addScoreToTeam(id, params) {
  return axios
    .post(`/teams/addscore/${id}`, JSON.stringify(params))
    .then(handleResponse)
    .catch(handleError);
}

async function getTeams(query) {
  return axios
    .get(`/teams`, { params: query })
    .then(handleResponse)
    .catch(handleError);
}

async function getTeamById(id) {
  return axios.get(`/teams/${id}`).then(handleResponse).catch(handleError);
}

async function deleteTeam(id) {
  return axios.delete(`/teams/${id}`).then(handleResponse).catch(handleError);
}

// handleResponse
function handleResponse(response) {
  return response.data;
}

//handleError
function handleError(error) {
  throw (
    (error.response.data && error.response.data.message) || error.response.status
  );
}
