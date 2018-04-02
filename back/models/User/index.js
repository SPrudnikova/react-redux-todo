const mongoose = require('mongoose');
const isAscii = require('validator/lib/isAscii');
const bcrypt = require("bcrypt-nodejs");
const SALT_FACTOR = 10;

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: [{validator: value => isAscii(value), message: 'Invalid username'}]
  },
  password: { type: String, required: true },
}, {
  timestamps: true
});

const noop = function() {};

UserSchema.pre("save", function (done) {
  const user = this;
  bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
    if (err) {
      return done(err);
    }
    bcrypt.hash(user.password, salt, noop, (err, hashedPassword) => {
      if (err) {
        return done(err);
      }
      user.password = hashedPassword;
      done();
    });
  });
});

UserSchema.methods.checkPassword = function(guess, done) {
  bcrypt.compare(guess, this.password, function(err, isMatch) {
    done(err, isMatch);
  });
};

module.exports.User = mongoose.model('User', UserSchema);