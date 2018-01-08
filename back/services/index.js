const auth = require('./auth');
const user = require('./user');
const todo = require('./todo');

module.exports = {
  AuthService: auth,
  UserService: user,
  TodoService: todo
};