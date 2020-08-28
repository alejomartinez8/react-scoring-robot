import { combineReducers } from 'redux';

import { alert } from './alert.reducer';
import { auth } from './auth.reducer';
import { register } from './register.reducer';

const rootReducer = combineReducers({
  alert,
  auth,
  register
});

export default rootReducer;
