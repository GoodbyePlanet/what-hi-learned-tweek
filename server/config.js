require('dotenv').config({ path: '../.env' });

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
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      },
    },
    sendGrid: {
      apiKey: process.env.SENDGRID_API_KEY,
      fromEmail: process.env.FROM_EMAIL,
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
      accessToken: {
        secret: process.env.ACCESS_TOKEN_SECRET,
        expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
      },
      refreshToken: {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
      },
    },
    sendGrid: {
      apiKey: process.env.SENDGRID_LIVE_API_KEY,
      fromEmail: process.env.FROM_EMAIL,
    },
  },
};

exports.get = env => config[env];
