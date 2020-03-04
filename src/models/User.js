const mongoose = require('mongoose');

const { Schema } = mongoose;
const isemail = require('isemail');
const bcrypt = require('bcrypt');

const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
  email: {
    type: String,
    validate: {
      validator: email => isemail(email),
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

const User = mongoose.model('User', userSchema);

module.exports = User;
