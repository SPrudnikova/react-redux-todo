import {postData} from './api';

let count = 100;

export function getUserInProgressTodos() {
  return postData('todosInProgress');
}

export function getTodoByUser(id) {
  return postData(`todos/${id}`);
}

export function addTodo (todo={title: `custom${count}`, dateStart: '12-12-12', dateEnd: '13-12-12'}) {
  count+=1;
  return postData('addTodo', todo);
}