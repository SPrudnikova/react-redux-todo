const express = require('express');

const controllers = require('./controllers');

const router = express.Router();
const {
  user,
  todo,
} = controllers;

/**
 * Handles controller execution and responds to user (API version).
 * This way controllers are not attached to the API.
 * Web socket has a similar handler implementation.
 * @param promise Controller Promise.
 * @param params (req) => [params, ...].
 */
const controllerHandler = (promise, params) => async (req, res, next) => {
  const boundParams = params ? params(req, res, next) : [];
  try {
    const result = await promise(...boundParams);
    return res.json(result || { message: 'OK' });
  } catch (error) {
    return res.status(error.status || 500).send(error); //error handling in express??
  }
};
const c = controllerHandler;

//============== auth ======================
router.post('/api/login', c(user.login, (req, res, next) => [req, res, next]));
router.post('/api/logout', c(user.logout, (req, res, next) => [req, res, next]));
router.post('/api/register', c(user.register, (req, res, next) => [req, res, next]));
router.post('/api/checkToken', c(user.checkToken, (req, res, next) => [req, res, next]));

//============== todos ======================
router.post('/api/todosInProgress', c(todo.getUserInProgressTodos, (req, res, next) => [req, res, next]));
router.post('/api/todos/:id', c(todo.getTodoByUser, (req, res, next) => [req, res, next]));
router.post('/api/addTodo', c(todo.addTodo, (req, res, next) => [req, res, next]));


module.exports = router;