const express = require('express');

const app = express();

const PORT = process.env.PORT || 3001;

app.listen(() => console.log(`Listening at http://localhost:${PORT}`));
