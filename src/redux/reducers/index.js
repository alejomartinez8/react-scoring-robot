import { combineReducers } from "redux";

import { alert } from "./alert.reducer";
import { auth } from "./auth.reducer";
import { user } from "./user.reducer";
import { event } from "./event.reducer";
import { challenge } from "./challenge.reducer";

const rootReducer = combineReducers({
  alert,
  auth,
  user,
  event,
  challenge,
});

export default rootReducer;
