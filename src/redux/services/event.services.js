import axios from "axios";

const config = {
  apiUrl: "http://localhost:5050/events",
};

export const eventServices = {
  addEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
};

async function addEvent(event) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(event),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

async function updateEvent(id, event) {
  const requestOptions = {
    method: "post",
    url: `${config.apiUrl}/${id}`,
    headers: { "Content-Type": "application/json" },
    data: JSON.stringify(event),
  };

  return axios(requestOptions).then(handleResponse).catch(handleError);
}

async function getAllEvents() {
  return axios.get(`${config.apiUrl}`).then(handleResponse).catch(handleError);
}

async function getEventById(id) {
  return axios.get(`${config.apiUrl}/${id}`).then(handleResponse).catch(handleError);
}

async function deleteEvent(id) {
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
