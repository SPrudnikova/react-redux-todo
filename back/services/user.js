const {User} = require('../models/User');

function createUser(data) {
  return User.create(data)
}

module.exports = {
  createUser,
};
