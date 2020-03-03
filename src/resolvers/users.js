const { getUsers, getUserById } = require('../db-actions/users');

const userResolvers = {
  Query: {
    getUsers: () => getUsers(),
    getUserById: (_, { id }) => getUserById(id),
  },
};

module.exports = userResolvers;
