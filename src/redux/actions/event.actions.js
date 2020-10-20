import { eventServices } from "../services";
import { alertActions } from "./alert.actions";
import { EventTypes } from "../constants";

const addEvent = (event) => (dispatch) => {
  eventServices
    .addEvent(event)
    .then(() => {
      dispatch({ type: EventTypes.CLEAR_EVENTS });
      dispatch(alertActions.setAlert("Evento Creado", "success"));
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const updateEvent = (id, event) => (dispatch) => {
  eventServices
    .updateEvent(id, event)
    .then((event) => {
      dispatch({ type: EventTypes.EVENT_LOADED, payload: event });
      dispatch(alertActions.setAlert("Evento actualizado", "success"));
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const getEvents = () => (dispatch) => {
  dispatch({ type: EventTypes.GET_EVENTS });

  eventServices
    .getEvents()
    .then((events) => {
      dispatch({ type: EventTypes.EVENTS_LOADED, payload: events });
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
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
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const getEventBySlug = (slug) => (dispatch) => {
  dispatch({ type: EventTypes.GET_EVENT });

  eventServices
    .getEventBySlug(slug)
    .then((event) => {
      dispatch({ type: EventTypes.EVENT_LOADED, payload: event });
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const deleteEvent = (id) => (dispatch) => {
  eventServices
    .deleteEvent(id)
    .then((res) => {
      if (res.type === "delete-success") {
        dispatch({ type: EventTypes.EVENT_DELETE, payload: id });
        dispatch(alertActions.setAlert("Evento Eliminado", "success"));
        dispatch(getEvents());
      } else {
        dispatch(alertActions.setAlert(res.message, "warning"));
      }
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

const toggleActiveEvent = (id) => (dispatch) => {
  dispatch({ type: EventTypes.TOGGLE_EVENT_ACTIVE });

  eventServices
    .toggleActiveEvent(id)
    .then((event) => {
      dispatch({ type: EventTypes.EVENT_ACTIVE_TOGGLE, payload: event });
    })
    .catch((error) => {
      dispatch({ type: EventTypes.EVENT_ERROR, payload: error });
      dispatch(alertActions.setAlert(error.toString(), "danger"));
    });
};

export const eventActions = {
  addEvent,
  updateEvent,
  getEvents,
  getEventById,
  getEventBySlug,
  deleteEvent,
  toggleActiveEvent,
};
