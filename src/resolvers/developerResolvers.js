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
    updateDeveloper: (_, { id, input: updatedDeveloper }) =>
      updateDeveloper(id, updatedDeveloper),
    deleteDeveloper: (_, { id }) => deleteDeveloper(id),
  },
};

module.exports = developerResolvers;
