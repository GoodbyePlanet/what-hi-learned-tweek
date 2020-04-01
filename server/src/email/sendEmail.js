require('dotenv').config();

/* eslint import/order: "off" */
const config = require('../../config').get(process.env.NODE_ENV);
const sendGridEmail = require('sendgrid')(config.sendGrid.apiKey);
const LOGGER = require('../logger/logger');
const confirmationEmailTemplate = require('./template');

const createEmailRequest = (to, activationCode, isResend) => {
  const body = isResend
    ? 'You requested a new email confirmation code :)'
    : 'Your Email Confirmation Code :)';

  return sendGridEmail.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: {
      personalizations: [
        {
          to: [
            {
              email: to,
            },
          ],
          subject: 'Nemanjas: Email Confirmation Code',
        },
      ],
      from: {
        email: config.sendGrid.fromEmail,
      },
      content: [
        {
          type: 'text/html',
          value: confirmationEmailTemplate(activationCode, body),
        },
      ],
    },
  });
};

const sendEmail = (email, activaitonCode, isResend) =>
  sendGridEmail
    .API(createEmailRequest(email, activaitonCode, isResend))
    .then(response => LOGGER.info('Successfully sent registration email', response))
    .catch(error =>
      LOGGER.error('An error has occurred while sending an email', error.response),
    );

module.exports = sendEmail;
