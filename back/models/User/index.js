const mongoose = require('mongoose');
const isAscii = require('validator/lib/isAscii');
const crypto = require('crypto');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    validate: [{validator: value => isAscii(value), message: 'Invalid username'}]
  },
  passwordHash: String,
  salt: String,
}, {
  timestamps: true
});

UserSchema.virtual('password')
  .set(function (password) {
    this._plainPassword = password;
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64');
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1');
    } else {
      this.salt = undefined;
      this.passwordHash = undefined;
    }
  })
  .get(function () {
    return this._plainPassword;
  });

//========= methods ===============
UserSchema.methods.checkPassword = function (password) {
  if (!password) return false;
  if (!this.passwordHash) return false;
  return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash;
};

UserSchema.methods.validatePassword = function () {
  const pass = UserSchema.get('password');
  return pass.length > 2;
};

module.exports.User = mongoose.model('User', UserSchema);