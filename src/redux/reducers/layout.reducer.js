import { LayoutTypes } from "../constants";

const initialSate = {
  toggleSidenav: false,
};

export function layout(state = initialSate, action) {
  const { type } = action;
  switch (type) {
    case LayoutTypes.TOGGLE_SIDEBAR:
      return { ...state, toggleSidenav: !state.toggleSidenav };

    default:
      return state;
  }
}
