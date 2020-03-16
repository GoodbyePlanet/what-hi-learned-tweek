const {
  getDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
  findDeveloperByEmail,
  register,
  login,
  activateAccount,
  resendActivationToken,
} = require('../db-actions/developers');

const developerResolvers = {
  Query: {
    getDevelopers: () => getDevelopers(),
    getDeveloperById: (_, { id }) => getDeveloperById(id),
    findDeveloperByEmail: (_, { email }) => findDeveloperByEmail(email),
  },
  Mutation: {
    signUp: (_, { password, input: developerData }) =>
      register({ ...developerData, password }),
    login: (_, { email, password }) => login(email, password),
    activateAccount: (_, { activationToken, developerId }) =>
      activateAccount(activationToken, developerId),
    resendActivationToken: (_, { developerId }) =>
      resendActivationToken(developerId),
    updateDeveloper: (_, { id, input: updatedDeveloper }) =>
      updateDeveloper(id, updatedDeveloper),
    deleteDeveloper: (_, { id }) => deleteDeveloper(id),
  },
};

module.exports = developerResolvers;
