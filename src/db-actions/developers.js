require('dotenv').config();

const jwt = require('jsonwebtoken');
const moment = require('moment');
const { Developer } = require('../models/Developer');
const {
  getActivationToken,
  createActivationToken,
  redeemeActivationToken,
  getNotRedeemedAndNotInvalidatedTokenByDeveloperId,
  invalidateActivationToken,
} = require('./activationTokens');
const config = require('../../config').get(process.env.NODE_ENV);
const sendEmail = require('../email/sendEmail');
const LOGGER = require('../logger/logger');

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

const register = async developerData => {
  try {
    if (await findDeveloperByEmail(developerData.email)) {
      throw Error(
        `Developer with email: ${developerData.email} already exists!`,
      );
    }

    const createdDeveloper = await createDeveloper({
      ...developerData,
      password: developerData.password,
    });
    const {
      developer: { email },
      token,
    } = await createActivationToken(createdDeveloper);

    sendEmail(email, token);

    return createdDeveloper;
  } catch (error) {
    LOGGER.error('An error has occurred', error);
  }
};

const login = async (email, password) => {
  const developer = await findDeveloperByEmail(email);
  const validPassword =
    developer && (await developer.isValidPassword(password));

  if (developer && validPassword) {
    return { developer, token: generateAuthToken(developer), errors: null };
  }

  return {
    errors: {
      email: !developer ? 'Email is not valid!' : null,
      password: developer && !validPassword ? 'Password is not valid!' : null,
    },
  };
};

const activateAccount = async (token, developerId) => {
  try {
    const activationToken = await getNotRedeemedAndNotInvalidatedTokenByDeveloperId(
      developerId,
    );
    const isTokenExpired = isExpired(
      activationToken && activationToken.createdAt,
    );

    if (activationToken && token === activationToken.token && !isTokenExpired) {
      await redeemeActivationToken(activationToken._id);
      return { developer: activationToken.developer, errors: null };
    }

    return {
      errors: { invalidToken: true, expired: isTokenExpired },
    };
  } catch (error) {
    LOGGER.error('Account Activation failed', error);
  }
};

// Update old activationToken => set invalidated to true, and create new activationToken
const resendActivationToken = async developerId => {
  try {
    const oldActivationToken = await getActivationToken(developerId);

    if (oldActivationToken) {
      await invalidateActivationToken(oldActivationToken._id);
    }

    const developer = oldActivationToken
      ? oldActivationToken.developer
      : await getDeveloperById(developerId);
    const createdActToken = await createActivationToken(developer);

    sendEmail(developer.email, createdActToken.token, true);
  } catch (error) {
    LOGGER.error('Resend Activation Token failed', error);
  }
};

const isExpired = createdAt =>
  moment.duration(moment().diff(moment(createdAt))).asHours() > 24;

const generateAuthToken = developer => {
  return jwt.sign({ id: developer._id }, config.auth.secret, {
    expiresIn: config.auth.expiresIn,
  });
};

module.exports = {
  getDevelopers,
  getDeveloperById,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
  findDeveloperByEmail,
  register,
  login,
  activateAccount,
  resendActivationToken,
};
