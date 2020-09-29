import axios from "axios";

export const scoreServices = {
  sendScore,
  getScores,
  getScoreById,
  deleteScore,
};

function sendScore(params) {
  return axios
    .post("/teams/score", JSON.stringify(params))
    .then(handleResponse)
    .catch(handleError);
}

function getScores(params) {
  console.log(params);

  return axios
    .get(`/scores`, { params: params })
    .then(handleResponse)
    .catch(handleError);
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
