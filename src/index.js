const express = require('express');
const { notFound, errorHandler } = require('./middlewares');
const { PORT } = require('../config');
const db = require('./db');

const app = express();

// TODO: Check HELMET => https://www.npmjs.com/package/helmet

db.connect();

app.get('/', async (_, res) => {
  res.json({ message: 'THIS IS THE INITAL ROUTE' });
});

app.use(notFound);
app.use(errorHandler);

db.connection.on('connected', () => {
  app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
});
