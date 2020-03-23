const { Developer } = require('../models/Developer');
const { PermissionError } = require('../validation/AuthErrors');

const getDevelopers = async () =>
  await Developer.find({}).orFail(new Error('No documents found'));

const getDeveloperById = async id =>
  await Developer.findById(id).orFail(
    new Error(`Developer with ${id} not found!`),
  );

const findDeveloperByEmail = async email => await Developer.findOne({ email });

const createDeveloper = async developerData =>
  await new Developer(developerData).save();

const updateDeveloper = async (id, updatedDeveloper, loggedInDeveloper) => {
  if (id !== loggedInDeveloper) {
    const Error = PermissionError('Not permitted to update resource!');
    throw new Error();
  }
  return await Developer.findByIdAndUpdate(
    id,
    { ...updatedDeveloper },
    {
      new: true,
      useFindAndModify: false,
    },
  ).orFail(new Error(`Update failed, ${id} does not exist`));
};

const deleteDeveloper = async (id, loggedInDeveloper) => {
  if (id !== loggedInDeveloper) {
    const Error = PermissionError('Not permitted to delete resource!');
    throw new Error();
  }
  return (await Developer.findByIdAndRemove(id, {
    useFindAndModify: false,
  }))
    ? id
    : new Error(`Delete failed, ${id} not found!`);
};

module.exports = {
  getDevelopers,
  getDeveloperById,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
  findDeveloperByEmail,
};
