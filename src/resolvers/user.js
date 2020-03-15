const {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  findUserByEmail,
  register,
  login,
  activateAccount,
} = require('../db-actions/users');

const userResolvers = {
  Query: {
    getUsers: () => getUsers(),
    getUserById: (_, { id }) => getUserById(id),
    findUserByEmail: (_, { email }) => findUserByEmail(email),
  },
  Mutation: {
    signUp: (_, { password, input: userData }) =>
      register({ ...userData, password }),
    login: (_, { email, password }) => login(email, password),
    activateAccount: (_, { activationToken, userId }) =>
      activateAccount(activationToken, userId),
    updateUser: (_, { id, input: updatedUser }) => updateUser(id, updatedUser),
    deleteUser: (_, { id }) => deleteUser(id),
  },
};

module.exports = userResolvers;
