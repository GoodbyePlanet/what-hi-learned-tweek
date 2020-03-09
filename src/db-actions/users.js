require('dotenv').config();

const shortid = require('shortid');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const config = require('../../config').get(process.env.NODE_ENV);

const getUsers = async () =>
  await User.find({}).orFail(new Error('No documents found'));

const getUserById = async id =>
  await User.findById(id).orFail(new Error(`User with ${id} not found!`));

const findUserByEmail = async email => await User.findOne({ email });

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

const register = async userData => {
  if (await findUserByEmail(userData.email)) {
    throw Error(`User with email: ${userData.email} already exists!`);
  }

  // TODO Send email after User creation
  // sendEmail(userData.email, generateActivationCode());

  return await createUser({
    ...userData,
    password: userData.password,
  });
};

const login = async (email, password) => {
  const user = await findUserByEmail(email);
  const validPassword = user && (await user.isValidPassword(password));

  if (user && validPassword) {
    return { user, token: generateAuthToken(user), errors: null };
  }

  return {
    errors: {
      email: !user ? 'Email is not valid!' : null,
      password: user && !validPassword ? 'Password is not valid!' : null,
    },
  };
};

const generateAuthToken = user => {
  return jwt.sign({ id: user._id }, config.auth.secret, {
    expiresIn: 86400, // in 24 hours
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  findUserByEmail,
  register,
  login,
};
