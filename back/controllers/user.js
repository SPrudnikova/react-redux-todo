const jwt = require('jsonwebtoken');

const passport = require("../services/auth");
const {UserService} = require("../services");
const {SECRET_KEY} = require("../constants");
const {ServerError} = require('../helpers/server');

function login(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('local', function (error, user, info) {
      if (error) {
        return reject(error);
      }
      else if (!user) {
        return reject(new ServerError(info, 401));
      }
      else {
        const payload = {id: user.id};
        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '43200m'});
        return resolve({message: "ok", token: token, username: user.username});
      }
    })(req, res, next);
  })
}

function logout(req, res) {
  return new Promise((resolve, reject) => {
    req.logout();
    return resolve({message: "ok"});
  })
}

function register(req, res) {
  const {username, password} = req.body;
  return UserService.findUserByUsername(username)
    .then(user => {
      if (!user) {
        return UserService.createUser({username, password})
          .then(user => {
            const payload = {id: user.id};
            const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '43200m'});
            return {message: "ok", token: token, username: user.username};
          })
      } else {
        throw new ServerError(`User with username '${username}' already exists.`, 500);
      }
    })
    .catch(error => {
      throw new ServerError(error.message, 500);
    })
}

function checkToken(req, res, next) {
  return new Promise((resolve, reject) => {
    passport.authenticate('jwt', function (err, user) {
      if (user) {
        return resolve({status: 'success'});
      } else {
        return reject({status: 'fail'});
      }
    })(req, res, next)
  })
}

function findUserByUsername(req, res, next) {
  const {username} = req.query;
  return UserService.findUserByUsername(username)
    .then(user => {
      if (user) {
        return {username: user.username};
      } else {
        return {};
      }
    })

}

module.exports = {
  login,
  logout,
  register,
  checkToken,
  findUserByUsername
};
