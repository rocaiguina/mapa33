import { combineReducers } from 'redux';

/* Import reducers and combine them below */
import example from './reducers/example';
import map from './reducers/MapReducer';
import registerWizard from './reducers/register-wizard';

const store = combineReducers({
  example,
  map,
  registerWizard
});

export default store;
