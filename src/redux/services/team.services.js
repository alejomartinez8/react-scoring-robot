import axios from "axios";

const config = {
  apiUrl: "http://localhost:5050/teams",
};

export const teamServices = {
  addTeam,
  updateTeam,
  getAllTeams,
  getTeamById,
  deleteTeam,
};

async function addTeam(team) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(team),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

async function updateTeam(id, team) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/${id}`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(team),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

async function getAllTeams() {
  return axios.get(`${config.apiUrl}`).then(handleResponse).catch(handleError);
}

async function getTeamById(id) {
  return axios.get(`${config.apiUrl}/${id}`).then(handleResponse).catch(handleError);
}

async function deleteTeam(id) {
  return axios
    .delete(`${config.apiUrl}/${id}`)
    .then(handleResponse)
    .catch(handleError);
}

// handleResponse
function handleResponse(response) {
  console.log("handleResponse: ", response);
  return response.data;
}

//handleError
function handleError(error) {
  console.error(
    "handleError: ",
    (error.response.data && error.response.data.message) || error.response.status
  );
  // return error.data
  throw (
    (error.response.data && error.response.data.message) || error.response.status
  );
}
