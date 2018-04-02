const {TodoService} = require("../services");
const ObjectId = require('mongoose').Types.ObjectId;
const {ServerError} = require('../helpers/server');


function getUserInProgressTodos (req) {
  if (req.user) {
    return TodoService.findInProgressTodosByUser({ userId: req.user._id });
  }
  else {
    throw new ServerError('Auth failed', 401);
  }
}

function getTodoByUser(req) {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  if (req.user) {
    return TodoService.findTodoByUser(query);
  }
  else {
    throw new ServerError('Auth failed', 401);
  }
}

function addTodo (req) {
  if (req.user) {
    return TodoService.createTodo({...req.body, userId: req.user._id});
  }
  else {
    throw new ServerError('Auth failed', 401);
  }
}

module.exports = {
  getUserInProgressTodos,
  getTodoByUser,
  addTodo,
};