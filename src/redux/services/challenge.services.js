import axios from "axios";

export const challengeServices = {
  addChallenge,
  updateChallenge,
  getAllChallenges,
  getChallengeById,
  deleteChallenge,
};

async function addChallenge(challenge) {
  return axios
    .post("/challenges", JSON.stringify(challenge))
    .then(handleResponse)
    .catch(handleError);
}

async function updateChallenge(id, challenge) {
  return axios
    .put(`/challenges/${id}`, JSON.stringify(challenge))
    .then(handleResponse)
    .catch(handleError);
}

async function getAllChallenges() {
  return axios.get("/challenges").then(handleResponse).catch(handleError);
}

async function getChallengeById(id) {
  return axios.get(`/challenges/${id}`).then(handleResponse).catch(handleError);
}

async function deleteChallenge(id) {
  return axios.delete(`/challenges/${id}`).then(handleResponse).catch(handleError);
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
