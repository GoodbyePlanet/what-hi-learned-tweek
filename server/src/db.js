require('dotenv').config();

const { connection, connect } = require('mongoose');
const config = require('../config').get(process.env.NODE_ENV);

connection.on('connected', () => console.info('Connected to MongoDB'));
connection.on('disconnected', () => console.info('Disconnected from MongoDB'));

const connectionOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

exports.connection = connection;
exports.connect = () => connect(config.database.url, connectionOptions);
