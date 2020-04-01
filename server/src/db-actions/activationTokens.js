const shortid = require('shortid');

const ActivationToken = require('../models/ActivationToken');
const LOGGER = require('../logger/logger');

const MONGOOSE_UPDATE_OPTIONS = { new: true, useFindAndModify: false };

const createActivationToken = async developer => {
  const activationToken = await new ActivationToken({
    developer,
    token: shortid.generate(),
  }).save();

  LOGGER.info('ACTIVATION TOKEN', activationToken);
  return activationToken;
};

const redeemeActivationToken = async id =>
  ActivationToken.findByIdAndUpdate(
    id,
    {
      redeemed: true,
    },
    MONGOOSE_UPDATE_OPTIONS,
  );

const invalidateActivationToken = async id =>
  ActivationToken.findByIdAndUpdate(
    id,
    {
      invalidated: true,
    },
    MONGOOSE_UPDATE_OPTIONS,
  );

const getActivationToken = async developerId =>
  ActivationToken.findOne({
    'developer._id': developerId,
  });

const getNotRedeemedAndNotInvalidatedTokenByDeveloperId = async developerId =>
  ActivationToken.findOne({
    'developer._id': developerId,
    redeemed: { $eq: false },
    invalidated: { $eq: false },
  });

module.exports = {
  createActivationToken,
  redeemeActivationToken,
  getActivationToken,
  getNotRedeemedAndNotInvalidatedTokenByDeveloperId,
  invalidateActivationToken,
};
