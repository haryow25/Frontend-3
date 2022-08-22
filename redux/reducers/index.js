import { combineReducers } from 'redux';
import {
  loginReducer,
  registerReducer,
  loadReducer,
  updateReducer,
} from './userReducer';
import { getPlayedReducer } from './getPlayedReduer';
import { monopoliScoreReducer } from './monopoliScoreReducer';

const reducer = combineReducers({
  played: getPlayedReducer,
  monopoli: monopoliScoreReducer,
  register: registerReducer,
  login: loginReducer,
  load: loadReducer,
  update: updateReducer,
});

export default reducer;
