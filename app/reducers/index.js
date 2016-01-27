import { combineReducers } from 'redux';
import { routeReducer as routing } from 'redux-simple-router';
import app from './app';
import item from './item';
import user from './user';

const rootReducer = combineReducers({
  app,
  item,
  user,
  routing
});

export default rootReducer;
