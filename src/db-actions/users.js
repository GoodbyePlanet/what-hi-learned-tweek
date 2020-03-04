const User = require('../models/User');

// TODO .orFail(new Error('No docs found!'));
const getUsers = async () => await User.find({});

const getUserById = async id => await User.findById(id);

const createUser = async userData => await new User(userData).save();

const updateUser = async (id, updatedUser) =>
  await User.findByIdAndUpdate(
    id,
    { ...updatedUser },
    {
      new: true,
      useFindAndModify: false,
    },
  );

const deleteUser = async id => await User.findByIdAndRemove(id);

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
