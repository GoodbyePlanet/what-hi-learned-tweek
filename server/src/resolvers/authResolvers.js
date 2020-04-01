const {
  register,
  login,
  activateAccount,
  resendActivationToken,
} = require('../accessControl/accessControl');

const authResolvers = {
  Mutation: {
    signUp: (_, { password, input: developerData }) =>
      register({ ...developerData, password }),
    login: (_, { email, password }, { res }) => login(email, password, res),
    activateAccount: (_, { activationToken, developerId }) =>
      activateAccount(activationToken, developerId),
    resendActivationToken: (_, { developerId }) => resendActivationToken(developerId),
  },
};

module.exports = authResolvers;
