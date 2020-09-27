import axios from "axios";

export const scoreServices = {
  sendScore,
  getAllScores,
  getScoreById,
  deleteScore,
};

function sendScore(score) {
  return axios
    .post("/scores", JSON.stringify(score))
    .then(handleResponse)
    .catch(handleError);
}

function getAllScores() {
  return axios.get("/scores").then(handleResponse).catch(handleError);
}

function getScoreById(id) {
  return axios.get(`/scores/${id}`).then(handleResponse).catch(handleError);
}

function deleteScore(id) {
  return axios.delete(`/scores/${id}`).then(handleResponse).catch(handleError);
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
