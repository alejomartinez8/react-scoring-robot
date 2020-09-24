import { EventTypes } from "../constants/EventTypes";

const intialState = {
  loading: true,
  event: {},
  events: [],
  error: [],
};

export function event(state = intialState, action) {
  const { type, payload } = action;

  switch (type) {
    case EventTypes.GET_EVENT:
    case EventTypes.GET_EVENTS:
      return {
        ...state,
        loading: true,
      };

    case EventTypes.EVENTS_LOADED:
      return {
        ...state,
        loading: false,
        event: {},
        events: payload,
        error: [],
      };

    case EventTypes.EVENT_LOADED:
      return {
        ...state,
        loading: false,
        event: payload,
        events: [],
        error: [],
      };

    case EventTypes.EVENT_DELETE:
      return {
        ...state,
        events: state.events.map((event) =>
          event.id === payload ? { ...event, deleting: true } : event
        ),
      };

    case EventTypes.CLEAR_EVENTS:
      return {
        ...state,
        loading: false,
        event: {},
        events: [],
      };

    case EventTypes.EVENT_ERROR:
      return {
        ...state,
        loading: false,
        event: {},
        events: [],
        error: payload,
      };

    default:
      return state;
  }
}
