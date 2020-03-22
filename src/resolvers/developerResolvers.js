const {
  getDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
  findDeveloperByEmail,
} = require('../db-actions/developers');

const developerResolvers = {
  Query: {
    getDevelopers: () => getDevelopers(),
    getDeveloperById: (_, { id }) => getDeveloperById(id),
    findDeveloperByEmail: (_, { email }) => findDeveloperByEmail(email),
  },
  Mutation: {
    updateDeveloper: (
      _,
      { id, input: updatedDeveloper },
      { req: { developerId: loggedInDeveloper } },
    ) => updateDeveloper(id, updatedDeveloper, loggedInDeveloper),
    deleteDeveloper: (_, { id }, { req: { developerId: loggedInDeveloper } }) =>
      deleteDeveloper(id, loggedInDeveloper),
  },
};

module.exports = developerResolvers;
