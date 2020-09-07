import { combineReducers } from "redux"

import { alert } from "./alert.reducer"
import { auth } from "./auth.reducer"
import { user } from "./user.reducer"

const rootReducer = combineReducers({
  alert,
  auth,
  user,
})

export default rootReducer
