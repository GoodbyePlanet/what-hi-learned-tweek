const {
  getDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
  findDeveloperByEmail,
} = require('../db-actions/developers');
const {
  register,
  login,
  activateAccount,
  resendActivationToken,
} = require('../accessControl/accessControl');

const developerResolvers = {
  Query: {
    getDevelopers: () => getDevelopers(),
    getDeveloperById: (_, { id }) => getDeveloperById(id),
    findDeveloperByEmail: (_, { email }) => findDeveloperByEmail(email),
  },
  Mutation: {
    signUp: (_, { password, input: developerData }) =>
      register({ ...developerData, password }),
    login: (_, { email, password }, { res }) => login(email, password, res),
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
