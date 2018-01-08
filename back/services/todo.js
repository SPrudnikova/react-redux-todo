const {ShortTodo, TodoModel} = require('../models/Todo');

function findInProgressTodosByUser(filter) {
  return TodoModel.find(filter, ShortTodo);
}

function findTodoByUser (filter) {
  return TodoModel.findOne(filter);
}

function createTodo (todo) {
  TodoModel.create(todo);
}

module.exports = {
  findInProgressTodosByUser,
  findTodoByUser,
  createTodo,
};