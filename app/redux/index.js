import { combineReducers } from 'redux';

/* Import reducers and combine them below */
import example from './reducers/example';
import map from './reducers/MapReducer';

const store = combineReducers({
  example,
  map,
});

export default store;
