const SparkPost = require('sparkpost');
const { SPARKPOST_API_KEY } = require('../../config');

const options = {
  origin: 'https://api.eu.sparkpost.com:443',
};

const client = new SparkPost(SPARKPOST_API_KEY, options);

client.transmissions
  .send({
    options: {
      sandbox: true,
    },
    content: {
      from: 'testing@sparkpostbox.com',
      subject: 'Hello, World!',
      html:
        "<html><body><p>Testing SparkPost - the world's most awesomest email service!</p></body></html>",
    },
    recipients: [{ address: 'nemanjavasa@gmail.com' }],
  })
  .then(data => {
    console.log('Woohoo! You just sent your first mailing!');
    console.log(data);
  })
  .catch(err => {
    console.log('Whoops! Something went wrong');
    console.log(err);
  });
