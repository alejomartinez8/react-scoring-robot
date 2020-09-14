import axios from "axios";

export const eventServices = {
  addEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  getEventByShortName,
  deleteEvent,
};

function addEvent(event) {
  return axios
    .post("/events", JSON.stringify(event))
    .then(handleResponse)
    .catch(handleError);
}

function updateEvent(id, event) {
  return axios
    .post(`/events/${id}`, JSON.stringify(event))
    .then(handleResponse)
    .catch(handleError);
}

function getAllEvents() {
  return axios.get("/events").then(handleResponse).catch(handleError);
}

function getEventById(id) {
  return axios.get(`/events/${id}`).then(handleResponse).catch(handleError);
}

function getEventByShortName(shortName) {
  return axios
    .get(`/events/shortName/${shortName}`)
    .then(handleResponse)
    .catch(handleError);
}

function deleteEvent(id) {
  return axios.delete(`/events/${id}`).then(handleResponse).catch(handleError);
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
