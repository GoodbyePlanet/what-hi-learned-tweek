const { getActivationToken } = require('../db-actions/activationTokens');

const activationTokenResolvers = {
  Query: {
    getActivationToken: (_, { userId }) => getActivationToken(userId),
  },
};

module.exports = activationTokenResolvers;
