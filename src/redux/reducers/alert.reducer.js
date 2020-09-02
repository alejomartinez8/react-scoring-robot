import { alertTypes } from "../types/alert.types";

const initialSate = [];

export function alert(state = initialSate, action) {
  const { type, payload } = action;
  switch (type) {
    case alertTypes.SET_ALERT:
      return [...state, payload];

    case alertTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
}
