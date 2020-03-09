require('dotenv').config();

const shortid = require('shortid');
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
          subject: 'Nemanjas Registration Confirmation code',
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

sendGridEmail
  .API(createEmailRequest('nemanjavasa@gmail.com', shortid.generate()))
  .then(response =>
    console.log('Successfully sent registration email', response),
  )
  .catch(error =>
    console.error(
      'An error has occurred while sending an email',
      error.response,
    ),
  );
