const { getActivationToken } = require('../db-actions/activationTokens');

const activationTokenResolvers = {
  Query: {
    getActivationToken: (_, { developerId }) => getActivationToken(developerId),
  },
};

module.exports = activationTokenResolvers;
