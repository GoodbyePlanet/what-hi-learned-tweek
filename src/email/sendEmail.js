require('dotenv').config();

const SparkPost = require('sparkpost');
const config = require('../../config').get(process.env.NODE_ENV);
const confirmationEmailTemplate = require('./template');

const client = new SparkPost(config.sparkPost.apiKey, {
  origin: config.sparkPost.endpoint,
});

client.transmissions
  .send({
    options: {
      sandbox: process.env.NODE_ENV === 'dev' ? true : false,
    },
    content: {
      from: config.sparkPost.fromEmail,
      subject: 'Email Confirmation Code',
      html: confirmationEmailTemplate('cF1!jLk'),
    },
    recipients: [{ address: 'ubgkrdwgmybcanmwxh@awdrt.net' }],
  })
  .then(data => {
    console.info('Email successfully sent!');
    console.log(data);
  })
  .catch(err => {
    console.error('Whoops! Something went wrong while sending email!');
    console.log(err);
  });
