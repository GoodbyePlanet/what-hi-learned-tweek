const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../db-actions/users');

const userResolvers = {
  Query: {
    getUsers: () => getUsers(),
    getUserById: (_, { id }) => getUserById(id),
  },
  Mutation: {
    createUser: (_, { input: userData }) => createUser(userData),
    updateUser: (_, { id, input: updatedUser }) => updateUser(id, updatedUser),
    deleteUser: (_, { id }) => deleteUser(id),
  },
};

module.exports = userResolvers;
