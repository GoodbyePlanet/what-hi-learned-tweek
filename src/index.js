require('dotenv').config();

const express = require('express');
const { notFound, errorHandler } = require('./middlewares');
const config = require('../config').get(process.env.NODE_ENV);
const db = require('./db');
const apolloServer = require('./graphqlRoute');

const app = express();

// TODO: Check HELMET => https://www.npmjs.com/package/helmet

db.connect();

app.get('/', async (_, res) => {
  res.json({ message: 'THIS IS THE INITAL ROUTE' });
});

const loggingMiddleware = (req, res, next) => {
  console.log('ip:', req.ip);
  next();
};

// app.use(loggingMiddleware);

apolloServer.applyMiddleware({ app });

app.use(notFound);
app.use(errorHandler);

db.connection.on('connected', () => {
  app.listen(config.app.port, () =>
    console.log(
      `Listening at http://localhost:${config.app.port}${apolloServer.graphqlPath}`,
    ),
  );
});
