require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3112,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
};
