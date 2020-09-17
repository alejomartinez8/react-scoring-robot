import { AlertTypes } from "../constants/AlertTypes";

const initialSate = [];

export function alert(state = initialSate, action) {
  const { type, payload } = action;
  switch (type) {
    case AlertTypes.SET_ALERT:
      return [...state, payload];

    case AlertTypes.REMOVE_ALERT:
      return state.filter((alert) => alert.id !== payload);

    default:
      return state;
  }
}
