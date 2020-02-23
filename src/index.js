const express = require('express');

const app = express();

// TODO: Check HELMET => https://www.npmjs.com/package/helmet

const PORT = process.env.PORT || 3001;

app.get('/', (_, res) => {
  res.json('THIS IS THE INITAL ROUTE');
});

// Middlware for creating 404 Error, setting response status to 404 and forwaring to
// the Error handler
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

// Error handler
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '' : err.stack,
  });
});

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
