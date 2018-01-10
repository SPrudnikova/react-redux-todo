const {User} = require('../models/User');

function createUser(data) {
  return User.create(data);
}

function findUserByUsername(username) {
  return User.findOne({username: username});
}

module.exports = {
  createUser,
  findUserByUsername,
};
