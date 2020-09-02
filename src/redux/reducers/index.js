import { combineReducers } from "redux";

import { alert } from "./alert.reducer";
import { auth } from "./auth.reducer";
import { profile } from "./profile.reducer";

const rootReducer = combineReducers({
  alert,
  auth,
  profile,
});

export default rootReducer;
