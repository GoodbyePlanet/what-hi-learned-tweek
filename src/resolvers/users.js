const { getUsers, getUserById, createUser } = require('../db-actions/users');

const userResolvers = {
  Query: {
    getUsers: () => getUsers(),
    getUserById: (_, { id }) => getUserById(id),
  },
  Mutation: {
    createUser: (_, { input: userData }) => createUser(userData),
  },
};

module.exports = userResolvers;
