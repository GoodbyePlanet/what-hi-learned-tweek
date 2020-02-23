const express = require('express');
const { notFound, errorHandler } = require('./middlewares');

const app = express();

// TODO: Check HELMET => https://www.npmjs.com/package/helmet

const PORT = process.env.PORT || 3001;

app.get('/', (_, res) => {
  res.json({ message: 'THIS IS THE INITAL ROUTE' });
});

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
