const mongoose = require('mongoose');

const { Schema } = mongoose;
const IsEmail = require('isemail');
const bcrypt = require('bcrypt');
const { isLongEnough, isStrongEnough } = require('../validation/password');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: email => IsEmail.validate(email),
      message: 'Email is not valid',
    },
    required: true,
  },
  password: { type: String, required: true },
  nickName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, min: [18, 'User has to be adult'], required: false },
});

userSchema.statics.generateHash = function(password) {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  return bcrypt.hashSync(password, salt);
};

userSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

userSchema.query.byEmail = function(email) {
  return this.where({ email });
};

userSchema.path('password').validate(function(password) {
  return isLongEnough(password) && isStrongEnough(password);
});

userSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(
    this.password,
    bcrypt.genSaltSync(SALT_WORK_FACTOR),
  );
  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;
