require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const { notFound, errorHandler } = require('./middlewares');
const config = require('../config').get(process.env.NODE_ENV);
const db = require('./db');
const apolloServer = require('./graphqlRoute');
const { verifyAccessToken } = require('./accessControl/accessControl');

const app = express();

// TODO: Check HELMET => https://www.npmjs.com/package/helmet

db.connect();

app.get('/', async (_, res) => {
  res.json({ message: 'THIS IS THE INITAL ROUTE' });
});

app.use(cookieParser());

app.use((req, _, next) => {
  console.log(req.cookies);
  const accessToken = req.cookies['access-token'];

  if (!accessToken) {
    next();
  }

  try {
    const payload = verifyAccessToken(accessToken);
    req.developerId = payload.id;
    next();
  } catch {}
});

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
