import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import Todos from './Todos';
import SelectedTodo from './SelectedTodo';
import User from './User';
import {USER_LOGOUT, SUCCESS} from '../actions/ActionTypes';


const appReducer = combineReducers({
  Todos,
  SelectedTodo,
  User,
  routerReducer
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT + SUCCESS) {
    state = undefined
  }

  return appReducer(state, action)
};

export default rootReducer;