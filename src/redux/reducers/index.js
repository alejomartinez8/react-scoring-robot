import { combineReducers } from 'redux';
import { auth } from './auth.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  alert,
  auth
});

export default rootReducer;
