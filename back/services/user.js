const {User} = require('../models/User');

function createUser(data) {
  return User.create(data);
}

function findUserByUsername(username) {
  return User.findOne({username: username});
}

function findUserById(id) {
  return User.findOne({_id: id});
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
};
