import { combineReducers } from 'redux';
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  alert,
  authentication
});

export default rootReducer;
