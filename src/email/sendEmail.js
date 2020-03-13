require('dotenv').config();

const LOGGER = require('../logger/logger');
const config = require('../../config').get(process.env.NODE_ENV);
const sendGridEmail = require('sendgrid')(config.sendGrid.apiKey);
const confirmationEmailTemplate = require('./template');

const createEmailRequest = (to, activationCode) =>
  sendGridEmail.emptyRequest({
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
          value: confirmationEmailTemplate(activationCode),
        },
      ],
    },
  });

const sendEmail = (email, activaitonCode) =>
  sendGridEmail
    .API(createEmailRequest(email, activaitonCode))
    .then(response =>
      LOGGER.info('Successfully sent registration email', response),
    )
    .catch(error =>
      LOGGER.error(
        'An error has occurred while sending an email',
        error.response,
      ),
    );

module.exports = sendEmail;
