require('dotenv').config();

const config = {
  dev: {
    app: {
      port: process.env.PORT || 3112,
    },
    database: {
      url: process.env.DATABASE_URL,
      password: process.env.DATABASE_PASS,
    },
    auth: {
      secret: process.env.AUTH_SECRET,
    },
    sparkPost: {
      apiKey: process.env.SPARKPOST_API_KEY,
      endpoint: process.env.SPARK_EU_ENDPOINT,
      fromEmail: process.env.SPARK_SANDBOX_FROM_EMAIL,
    },
  },
  live: {
    app: {
      port: process.env.PORT || 3112,
    },
    database: {
      url: process.env.DATABASE_LIVE_URL,
      password: process.env.DATABASE_LIVE_PASS,
    },
    auth: {
      secret: process.env.AUTH_SECRET,
    },
    sparkPost: {
      apiKey: process.env.SPARKPOST_API_KEY,
      endpoint: process.env.SPARK_EU_ENDPOINT,
      fromEmail: process.env.SPARK_LIVE_FROM_EMAIL,
    },
  },
};

exports.get = env => config[env];
