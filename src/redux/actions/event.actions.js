import { eventServices } from "../services";
import { setAlert } from "./alert.actions";
import { EventTypes } from "../constants";

const addEvent = (event) => (dispatch) => {
  eventServices
    .addEvent(event)
    .then((event) => {
      dispatch({ type: EventTypes.CLEAR_EVENTS });
      dispatch(setAlert("Evento Creado", "success"));
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const updateEvent = (id, event) => (dispatch) => {
  eventServices
    .updateEvent(id, event)
    .then((event) => {
      dispatch({ type: EventTypes.EVENT_LOADED, payload: event });
      dispatch(setAlert("Evento actualizado", "success"));
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const getAllEvents = () => (dispatch) => {
  dispatch({ type: EventTypes.GET_EVENTS });

  eventServices
    .getAllEvents()
    .then((events) => {
      dispatch({ type: EventTypes.EVENTS_LOADED, payload: events });
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const getEventById = (id) => (dispatch) => {
  dispatch({ type: EventTypes.GET_EVENT });

  eventServices
    .getEventById(id)
    .then((event) => {
      dispatch({ type: EventTypes.EVENT_LOADED, payload: event });
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const getEventByShortName = (slug) => (dispatch) => {
  dispatch({ type: EventTypes.GET_EVENT });

  eventServices
    .getEventByShortName(slug)
    .then((event) => {
      dispatch({ type: EventTypes.EVENT_LOADED, payload: event });
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

const deleteEvent = (id) => (dispatch) => {
  eventServices
    .deleteEvent(id)
    .then(() => {
      dispatch({ type: EventTypes.EVENT_DELETE, payload: id });
      dispatch(setAlert("Evento Eliminado", "success"));
      dispatch(getAllEvents());
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(setAlert(error.toString(), "danger"));
    });
};

export const eventActions = {
  addEvent,
  updateEvent,
  getAllEvents,
  getEventById,
  getEventByShortName,
  deleteEvent,
};
