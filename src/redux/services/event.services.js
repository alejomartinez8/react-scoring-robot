import axios from "axios";

export const eventServices = {
  addEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  deleteEvent,
};

async function addEvent(event) {
  return axios
    .post("/events", JSON.stringify(event))
    .then(handleResponse)
    .catch(handleError);
}

async function updateEvent(id, event) {
  return axios
    .put(`/events/${id}`, JSON.stringify(event))
    .then(handleResponse)
    .catch(handleError);
}

async function getAllEvents() {
  return axios.get("/events").then(handleResponse).catch(handleError);
}

async function getEventById(id) {
  return axios.get(`/events/${id}`).then(handleResponse).catch(handleError);
}

async function deleteEvent(id) {
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
