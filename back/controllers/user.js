const passport = require("passport");
const { UserService } = require("../services");
const { ServerError } = require('../helpers/server');

function login (req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('login', function (error, user, info) {
      if (error) {
        return reject(error);
      }
      else if (!user) {
        return reject(new ServerError(info, 401));
      }
      else {
        req.logIn(user, function (err) {
          if (err) {
            return reject(error);
          }
          return resolve({ message: "ok", username: user.username });
        });
      }
    })(req, res, next);
  })
}

function logout (req, res) {
  return new Promise((resolve, reject) => {
    req.logout();
    req.session.destroy(function (err) {
      return resolve({ message: "ok" });
    });
  })
}

function register (req, res) {
  const { username, password } = req.body;
  return new Promise((resolve, reject) => {
    return UserService.findUserByUsername(username)
      .then(user => {
        if (!user) {
          return UserService.createUser({ username, password })
        } else {
          throw new ServerError(`User with username '${username}' already exists.`, 500);
        }
      })
      .then(user => {
        req.logIn(user, function (err) {
          if (err) {
            reject(new ServerError(err.message, 500));
          }
          return resolve({ message: "ok", username: user.username });
        });
      })
  })
}

function findUserByUsername (req) {
  const { username } = req.query;
  return UserService.findUserByUsername(username)
    .then(user => {
      if (user) {
        return { username: user.username };
      } else {
        return {};
      }
    })
}

function getActiveUser (req) {
  if (req.user) {
    return UserService.findUserById(req.user._id)
      .then(({ username }) => ({ username }));
  }
  else {
    throw new ServerError('Auth failed', 401);
  }
}

module.exports = {
  login,
  logout,
  register,
  findUserByUsername,
  getActiveUser,
};
