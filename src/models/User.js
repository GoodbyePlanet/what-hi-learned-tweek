const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  nickName: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, min: [18, 'User has to be adult'], required: false },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
