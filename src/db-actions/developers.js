require('dotenv').config();

const { Developer } = require('../models/Developer');

const getDevelopers = async () =>
  await Developer.find({}).orFail(new Error('No documents found'));

const getDeveloperById = async id =>
  await Developer.findById(id).orFail(
    new Error(`Developer with ${id} not found!`),
  );

const findDeveloperByEmail = async email => await Developer.findOne({ email });

const createDeveloper = async developerData =>
  await new Developer(developerData).save();

const updateDeveloper = async (id, updatedDeveloper) =>
  await Developer.findByIdAndUpdate(
    id,
    { ...updatedDeveloper },
    {
      new: true,
      useFindAndModify: false,
    },
  ).orFail(new Error(`Update failed, ${id} does not exist`));

const deleteDeveloper = async id =>
  (await Developer.findByIdAndRemove(id, {
    useFindAndModify: false,
  }))
    ? id
    : new Error(`Delete failed, ${id} not found!`);

module.exports = {
  getDevelopers,
  getDeveloperById,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
  findDeveloperByEmail,
};
