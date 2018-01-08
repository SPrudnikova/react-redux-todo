const passport = require("passport");
const LocalStrategy = require('passport-local'); //локальная стратегия авторизации
const JwtStrategy = require('passport-jwt').Strategy; // авторизация через JWT
const ExtractJwt = require('passport-jwt').ExtractJwt; // авторизация через JWT

const {User} = require('../models/User');
const {SECRET_KEY} = require("../constants");

//============passport local============
passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false
  },
  function (username, password, next) {
    User.findOne({username}, (err, user) => {
      if (err) {
        return next(err);
      }
      if (!user || !user.checkPassword(password)) {
        return next(null, false, 'Нет такого пользователя или пароль неверен.');
      }
      return next(null, user);
    });
  })
);


//============passport jwt============
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = SECRET_KEY;

passport.use(new JwtStrategy(jwtOptions, function (payload, next) {
    User.findById(payload.id, (err, user) => {
      if (err) {
        return done(err)
      }
      if (user) {
        next(null, user)
      } else {
        next(null, false)
      }
    })
  })
);

module.exports = passport;