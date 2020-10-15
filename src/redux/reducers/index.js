import { combineReducers } from "redux";

import { alert } from "./alert.reducer";
import { auth } from "./auth.reducer";
import { user } from "./user.reducer";
import { event } from "./event.reducer";
import { challenge } from "./challenge.reducer";
import { team } from "./team.reducer";
import { layout } from "./layout.reducer";

const rootReducer = combineReducers({
  alert,
  auth,
  user,
  event,
  challenge,
  team,
  layout,
});

export default rootReducer;
