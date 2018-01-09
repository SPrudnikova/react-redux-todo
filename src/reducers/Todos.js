import {List, Record} from 'immutable'

import {
  FETCHING_TODOS,
  START,
  SUCCESS,
  FAIL, ADD_TODO
} from '../actions/ActionTypes';

const TodoRecord = Record({
  dateStart: '',
  dateEnd: '',
  title: '',
  description: '',
  userId: '',
  status: '',
  priority: '',
  _id: ''
});

const ReducerState = new Record({
  data: new List([]),
  loading: false,
  error: null
});

const initialState = new ReducerState();

const MessagesData = (state = initialState, {type, payload, message}) => {
  switch (type) {
    case FETCHING_TODOS + START:
      return state.withMutations(s => s.set('loading', true));

    case FETCHING_TODOS + SUCCESS:
      return state.withMutations(s => {
        return s
          .set('loading', false)
          .set('data', state.data.concat(payload.map(todo => new TodoRecord(todo))))
      });

    case FETCHING_TODOS + FAIL:
      return state.withMutations(s => s.set('loading', false).set('error', message));

    default:
      return state;
  }
};

export default MessagesData;
