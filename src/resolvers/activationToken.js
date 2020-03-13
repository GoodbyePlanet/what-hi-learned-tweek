const {
  getActivationTokenByUserId,
} = require('../db-actions/activationTokens');

const activationTokenResolvers = {
  Query: {
    getActivationToken: (_, { userId }) => getActivationTokenByUserId(userId),
  },
};

module.exports = activationTokenResolvers;
