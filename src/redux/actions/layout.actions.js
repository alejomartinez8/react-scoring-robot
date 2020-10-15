import { LayoutTypes } from "../constants";

const toggleSidenavAction = () => (dispatch) => {
  dispatch({ type: LayoutTypes.TOGGLE_SIDEBAR });
};

export const layoutActions = {
  toggleSidenavAction,
};
