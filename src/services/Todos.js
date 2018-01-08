import {postData} from './api';

export function getUserInProgressTodos() {
  return postData('todosInProgress');
}

export function getTodoByUser(id) {
  return postData(`todos/${id}`);
}

export function addTodo (todo={title: "custom", dateStart: '12-12-12', dateEnd: '13-12-12'}) {
  debugger
  return postData('addTodo', todo);
}