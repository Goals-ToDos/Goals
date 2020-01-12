import { combineReducers } from 'redux';

// import all reducers here

import appReducer from './appReducer';
import loginReducer from './loginReducer';
import goalReducer from './goalReducer';
import createReducer from './createReducer';
import weekReducer from './weekReducer';
import scheduleReducer from './scheduleReducer';


// combine reducers
const reducers = combineReducers({
  app: appReducer,
  login: loginReducer,
  goal: goalReducer,
  create: createReducer,
  week: weekReducer,
  schedule: scheduleReducer,
});

// make the combined reducers available for import
export default reducers;

