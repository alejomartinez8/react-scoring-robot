import { combineReducers } from "redux";

import { alert } from "./alert.reducer";
import { auth } from "./auth.reducer";
import { user } from "./user.reducer";
import { event } from "./event.reducer";

const rootReducer = combineReducers({
  alert,
  auth,
  user,
  event,
});

export default rootReducer;
