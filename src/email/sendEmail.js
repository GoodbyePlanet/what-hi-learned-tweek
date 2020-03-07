const SparkPost = require('sparkpost');
const {
  SPARKPOST_API_KEY,
  SPARK_EU_ENDPOINT,
  SPARK_SANDBOX_FROM_EMAIL,
  NODE_ENV,
} = require('../../config');
const confirmationEmailTemplate = require('./template');

const client = new SparkPost(SPARKPOST_API_KEY, { origin: SPARK_EU_ENDPOINT });

client.transmissions
  .send({
    options: {
      sandbox: NODE_ENV === 'dev' ? true : false,
    },
    content: {
      from: SPARK_SANDBOX_FROM_EMAIL,
      subject: 'Hello, World!',
      html: confirmationEmailTemplate('cF1!jLk'),
    },
    recipients: [{ address: 'amuagzrnzngvnkaghf@awdrt.org' }],
  })
  .then(data => {
    console.info('Email successfully sent!');
    console.log(data);
  })
  .catch(err => {
    console.error('Whoops! Something went wrong while sending email!');
    console.log(err);
  });
