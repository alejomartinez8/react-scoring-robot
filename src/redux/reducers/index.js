import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { auth } from './auth.reducer';

const rootReducer = combineReducers({
  alert,
  auth
});

export default rootReducer;
