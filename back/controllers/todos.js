const {TodoService} = require("../services");
const passport = require("../services/auth");
const ObjectId = require('mongoose').Types.ObjectId;


function getUserInProgressTodos(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', function (err, user) {
      if (user) {
        resolve(TodoService.findInProgressTodosByUser({userId: user.id}));
      } else {
        return reject({status: 401, message: 'Auth failed'});
      }
    })(req, res, next);
  })
}

function getTodoByUser(req, res, next) {
  const id = req.params.id;
  const query = {_id: new ObjectId(id)};
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', function (err, user) {
      if (user) {
        resolve(TodoService.findTodoByUser(query));
      } else {
        return reject({status: 401, message: 'Auth failed'});
      }
    })(req, res, next);
  })
}

function addTodo (req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', function (err, user) {
      if (user) {
        resolve(TodoService.createTodo({...req.body, userId: user.id}));
      } else {
        return reject({status: 401, message: 'Auth failed'});
      }
    })(req, res, next);
  })
}

module.exports = {
  getUserInProgressTodos,
  getTodoByUser,
  addTodo,
};