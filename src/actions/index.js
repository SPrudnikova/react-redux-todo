import {replace} from 'react-router-redux';

import {
  FETCHING_TODOS,
  START,
  SELECT_TODO,
  UNSELECT_TODO,
  ADD_TODO,
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  SUCCESS,
  FAIL
} from './ActionTypes';
import {getUserInProgressTodos, getTodoByUser, addTodo} from "../services/Todos";
import {userLogin, userRegister, userLogout} from "../services/User";


export const getTodosData = () => (dispatch, getState) => {
  const {Todos} = getState();
  if (Todos.data.size !== 0) return;

  dispatch({type: FETCHING_TODOS + START});

  return getUserInProgressTodos()
    .then(
      response => {
        dispatch({type: FETCHING_TODOS + SUCCESS, payload: response});
      },
      error => {
        dispatch({type: FETCHING_TODOS + FAIL, payload: error});
        dispatch(replace('/error'));
      })
};

export const selectTodo = (id) => (dispatch) => {
  dispatch({type: SELECT_TODO + START, payload: {id}});

  return getTodoByUser(id)
    .then(
      response => {
        dispatch({type: SELECT_TODO + SUCCESS, payload: response});
      },
      error => {
        dispatch({type: SELECT_TODO + FAIL, payload: error});
        dispatch(replace('/error'));
      })
};

export const unSelectTodo = () => ({
  type: UNSELECT_TODO
});

export const loginUser = (data) => (dispatch) => {
  dispatch({type: USER_LOGIN + START});
  return userLogin(data)
    .then(response => {
      dispatch({type: USER_LOGIN + SUCCESS, payload: response});
      localStorage.setItem('sampleToken', response.token);
      dispatch(replace('/in-progress'));
    })
    .catch(err => {
      dispatch({type: USER_LOGIN + FAIL, message: err.message});
    })
};

export const registerUser = (data) => (dispatch) => {
  dispatch({type: USER_LOGIN + START});
  return userRegister(data)
    .then(response => {
      dispatch({type: USER_REGISTER + SUCCESS, payload: response});
      localStorage.setItem('sampleToken', response.token);
      dispatch(replace('/in-progress'));
    })
    .catch(err => {
      dispatch({type: USER_REGISTER + FAIL, message: `There is already user with username '${data.username}'`});
    })
};

export const logoutUser = () => (dispatch) => {
  return userLogout()
    .then(res => {
      localStorage.removeItem('sampleToken');
      dispatch({type: USER_LOGOUT + SUCCESS});
      dispatch(replace('/login'));
    })
    .catch(err => {
      console.log('message', err.message);
      dispatch({type: USER_LOGOUT + FAIL});
    })
};

export const addNewTodo = () => dispatch => {
  return addTodo()
    .then(res => {
      dispatch({type: ADD_TODO + SUCCESS, message: 'Todo was successfully created'});
    })
    .catch(err => {
      console.log('message', err.message);
      dispatch({type: ADD_TODO + FAIL, message: `Todo wasn't created`});
    })
};
