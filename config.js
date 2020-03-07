require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 3112,
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
  AUTH_SECRET: process.env.AUTH_SECRET,
  SPARKPOST_API_KEY: process.env.SPARKPOST_API_KEY,
  SPARK_EU_ENDPOINT: process.env.SPARK_EU_ENDPOINT,
  SPARK_SANDBOX_FROM_EMAIL: process.env.SPARK_SANDBOX_FROM_EMAIL,
};
