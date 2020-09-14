import axios from "axios";

export const teamServices = {
  addTeam,
  updateTeam,
  getAllTeams,
  getTeamById,
  deleteTeam,
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

async function getAllTeams() {
  return axios.get("/teams").then(handleResponse).catch(handleError);
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
