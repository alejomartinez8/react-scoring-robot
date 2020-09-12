import axios from "axios";

const config = {
  apiUrl: "http://localhost:5050/challenges",
};

export const challengeServices = {
  addChallenge,
  updateChallenge,
  getAllChallenges,
  getChallengeById,
  deleteChallenge,
};

async function addChallenge(challenge) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(challenge),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

async function updateChallenge(id, challenge) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/${id}`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(challenge),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

async function getAllChallenges() {
  return axios.get(`${config.apiUrl}`).then(handleResponse).catch(handleError);
}

async function getChallengeById(id) {
  return axios.get(`${config.apiUrl}/${id}`).then(handleResponse).catch(handleError);
}

async function deleteChallenge(id) {
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
