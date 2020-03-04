const User = require('../models/User');

const getUsers = async () =>
  await User.find({}).orFail(new Error('No documents found'));

const getUserById = async id =>
  await User.findById(id).orFail(new Error(`User with ${id} not found!`));

const createUser = async userData => await new User(userData).save();

const updateUser = async (id, updatedUser) =>
  await User.findByIdAndUpdate(
    id,
    { ...updatedUser },
    {
      new: true,
      useFindAndModify: false,
    },
  ).orFail(new Error(`Update failed, ${id} does not exist`));

const deleteUser = async id =>
  (await User.findByIdAndRemove(id, {
    useFindAndModify: false,
  }))
    ? id
    : new Error(`Delete failed, ${id} not found!`);

module.exports = { getUsers, getUserById, createUser, updateUser, deleteUser };
