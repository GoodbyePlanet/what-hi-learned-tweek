const User = require('../models/User');

const getUsers = async () => await User.find({});

const getUserById = async id => await User.findById(id);

module.exports = { getUsers, getUserById };
