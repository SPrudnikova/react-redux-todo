import {Record} from "immutable";

import {
  USER_LOGIN,
  USER_REGISTER,
  USER_LOGOUT,
  SUCCESS,
  FAIL,
  START
} from '../actions/ActionTypes';

const UserRecord = new Record({
  username: '',
  token: '',
  _id: ''
});

const ReducerState = new Record({
  data: '',
  loading: false,
  error: null
});

const initialState = new ReducerState();

const User = (state = initialState, {type, payload, message}) => {
  switch (type) {
    case USER_LOGIN + START:
      return state.withMutations(s => {
        return s
          .set('error', null)
          .set('data', '')
          .set('loading', true)
      });
    case USER_LOGIN + SUCCESS:
      return state.withMutations(s => {
        return s
          .set('data', new UserRecord(payload))
          .set('error', null)
          .set('loading', false)
      });

    case USER_LOGIN + FAIL:
      return state.withMutations(s => {
        return s
          .set('error', "Check your username and password")
          .set('data', '')
          .set('loading', false)
      });

    case USER_REGISTER + SUCCESS:
      return state.withMutations(s => {
        return s
          .set('data', new UserRecord(payload))
          .set('error', null)
          .set('loading', false)
      });

    case USER_REGISTER + FAIL:
      return state.withMutations(s => {
        return s
          .set('error', message)
          .set('data', '')
          .set('loading', false)
      });

    case USER_LOGOUT + FAIL:
      return state.withMutations(s => {
        return s
          .set('error', "Something goes wrong. Try again please.")
          .set('loading', false)
      });

    default:
      return state;
  }
};

export default User;