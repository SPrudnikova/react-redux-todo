import {createSelector} from 'reselect';

export const inprogressTodosSelector = state => state.Todos.data;
export const selectedTodoSelector = state => state.SelectedTodo.data;