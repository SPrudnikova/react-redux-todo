import {Record} from "immutable";

import {
  SELECT_TODO, UNSELECT_TODO, SUCCESS, FAIL
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
  data: new Record({}),
  loading: false,
  error: null
});

const initialState = new ReducerState();

const SelectedTodo = (state = initialState, {type, payload}) => {
  switch (type) {
    case SELECT_TODO + SUCCESS:
      return state.withMutations(s => s.set('data', new TodoRecord(payload)));

    case UNSELECT_TODO:
      return state.withMutations(s => s.set('data', new TodoRecord({})));

    default:
      return state;
  }
};

export default SelectedTodo;
