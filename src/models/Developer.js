const mongoose = require('mongoose');

const { Schema } = mongoose;
const IsEmail = require('isemail');
const bcrypt = require('bcrypt');
const { isLongEnough, isStrongEnough } = require('../validation/password');

const SALT_WORK_FACTOR = 10;

const developerSchema = new Schema({
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
});

developerSchema.statics.generateHash = function(password) {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  return bcrypt.hashSync(password, salt);
};

developerSchema.methods.isValidPassword = async function(password) {
  return bcrypt.compareSync(password, this.password);
};

developerSchema.path('password').validate(function(password) {
  return isLongEnough(password) && isStrongEnough(password);
});

developerSchema.pre('save', function(next) {
  this.password = bcrypt.hashSync(
    this.password,
    bcrypt.genSaltSync(SALT_WORK_FACTOR),
  );
  next();
});

const Developer = mongoose.model('Developer', developerSchema);

module.exports = { Developer, developerSchema };
