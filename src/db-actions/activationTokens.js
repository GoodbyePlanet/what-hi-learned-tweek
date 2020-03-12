const shortid = require('shortid');

const ActivationToken = require('../models/ActivationToken');
const LOGGER = require('../logger/logger');

const createActivationToken = async userId => {
  const activationToken = await new ActivationToken({
    user: userId,
    token: shortid.generate(),
  }).save();
  const populatedActivationToken = await ActivationToken.findById(
    activationToken._id,
  ).populate('user');

  LOGGER.info('POPULATED ACTIVATION TOKEN', populatedActivationToken);
  return populatedActivationToken;
};

module.exports = { createActivationToken };
