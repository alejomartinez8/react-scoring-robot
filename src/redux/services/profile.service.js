import axios from "axios";

const config = {
  apiUrl: "http://localhost:5050/profiles",
};

export const profileServices = {
  getCurrentProfile,
};

async function getCurrentProfile() {
  return axios
    .get(`${config.apiUrl}/me`)
    .then(handleResponse)
    .catch(handleError);
}

// handleResponse
function handleResponse(response) {
  console.log("handleResponse: ", response);
  return response.data;
}

//handleResponse
function handleError(error) {
  console.log("handleError: ", error.response);
  if (error.response.status === 401) {
    logout();
  }
  const _error =
    (error.response.data && error.response.data.message) ||
    error.response.status;
  return Promise.reject(_error);
}
