import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers/index';
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'

const loggerMiddleware = createLogger();
// we are adding composeWithDevTools here to get easy access to the Redux dev tools
const store = createStore(
  reducers,
  applyMiddleware(
    thunkMiddleware, // lets us dispatch() functions
    loggerMiddleware // neat middleware that logs actions
  )
);

export default store;