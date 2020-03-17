require('dotenv').config();

const jwt = require('jsonwebtoken');
const moment = require('moment');
const {
  getActivationToken,
  createActivationToken,
  redeemeActivationToken,
  getNotRedeemedAndNotInvalidatedTokenByDeveloperId,
  invalidateActivationToken,
} = require('../db-actions/activationTokens');
const {
  findDeveloperByEmail,
  createDeveloper,
} = require('../db-actions/developers');
const {
  auth: { accessToken, refreshToken },
} = require('../../config').get(process.env.NODE_ENV);
const sendEmail = require('../email/sendEmail');
const LOGGER = require('../logger/logger');

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

const login = async (email, password, res) => {
  const developer = await findDeveloperByEmail(email);
  const validPassword =
    developer && (await developer.isValidPassword(password));

  if (developer && validPassword) {
    const token = generateAccessToken(developer);
    res.cookie('access-token', token, {
      expires: generateExpirationDate(2, 900000), // access-token will be removed after 30 min
    });
    res.cookie('refresh-token', generateRefreshToken(developer), {
      expires: generateExpirationDate(8, 3600000), // refresh-token will be removed after 8 hours
    });

    return { developer, token, errors: null };
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

const generateAccessToken = ({ _id, nickName }) =>
  jwt.sign({ id: _id, nickName }, accessToken.secret, {
    expiresIn: accessToken.expiresIn,
  });

const generateRefreshToken = ({ _id }) =>
  jwt.sign({ id: _id }, refreshToken.secret, {
    expiresIn: refreshToken.expiresIn,
  });

const generateExpirationDate = (multiplier, miliseconds) =>
  new Date(Date.now() + multiplier * miliseconds);

module.exports = {
  register,
  login,
  activateAccount,
  resendActivationToken,
};
