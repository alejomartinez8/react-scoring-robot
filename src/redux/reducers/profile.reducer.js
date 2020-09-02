import { profileTypes } from "../types/profile.types";

const initalState = {
  profile: null,
  profiles: [],
  loading: true,
  error: {},
};

export function profile(state = initalState, action) {
  const { type, payload } = action;
  switch (type) {
    case profileTypes.GET_PROFILE:
    case profileTypes.UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };

    case profileTypes.PROFILE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
        profile: null,
      };

    case profileTypes.CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        profiles: [],
        loading: false,
      };
    default:
      return state;
  }
}
