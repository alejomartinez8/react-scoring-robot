import axios from "axios";

export const challengeServices = {
  addChallenge,
  updateChallenge,
  getChallenges,
  getChallengeById,
  getChallengeBySlug,
  deleteChallenge,
};

function addChallenge(challenge) {
  return axios
    .post("/challenges", JSON.stringify(challenge))
    .then(handleResponse)
    .catch(handleError);
}

function updateChallenge(id, challenge) {
  return axios
    .post(`/challenges/${id}`, JSON.stringify(challenge))
    .then(handleResponse)
    .catch(handleError);
}

function getChallenges(query) {
  return axios
    .get("/challenges", { params: query })
    .then(handleResponse)
    .catch(handleError);
}

function getChallengeById(id) {
  return axios.get(`/challenges/${id}`).then(handleResponse).catch(handleError);
}

function getChallengeBySlug(slug) {
  return axios
    .get(`/challenges/?slug=${slug}`)
    .then(handleResponse)
    .catch(handleError);
}

function deleteChallenge(id) {
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
