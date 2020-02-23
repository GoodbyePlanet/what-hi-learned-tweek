const { connection, connect } = require('mongoose');
const { DATABASE_URL } = require('./../config');

connection.on('connected', () => console.info('Connected to MongoDB'));
connection.on('disconnected', () => console.info('Disconnected from MongoDB'));

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

exports.connection = connection;
exports.connect = () => connect(DATABASE_URL, connectionOptions);
