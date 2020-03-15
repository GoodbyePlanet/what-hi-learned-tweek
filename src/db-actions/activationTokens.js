const shortid = require('shortid');

const ActivationToken = require('../models/ActivationToken');
const LOGGER = require('../logger/logger');

const createActivationToken = async user => {
  const activationToken = await new ActivationToken({
    user,
    token: shortid.generate(),
  }).save();

  LOGGER.info('ACTIVATION TOKEN', activationToken);
  return activationToken;
};

const getActivationToken = async userId =>
  await ActivationToken.findOne({
    'user._id': userId,
  });

const getNotRedeemedAndNotInvalidatedTokenByUserId = async userId =>
  await ActivationToken.findOne({
    'user._id': userId,
    reedemed: { $eq: false },
    invalidated: { $eq: false },
  });

module.exports = {
  createActivationToken,
  getActivationToken,
  getNotRedeemedAndNotInvalidatedTokenByUserId,
};
