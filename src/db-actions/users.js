const User = require('../models/User');

// TODO .orFail(new Error('No docs found!'));
const getUsers = async () => await User.find({});

const getUserById = async id => await User.findById(id);

const createUser = async userData => await new User(userData).save();

module.exports = { getUsers, getUserById, createUser };
