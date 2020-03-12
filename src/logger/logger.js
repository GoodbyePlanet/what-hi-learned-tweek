require('dotenv').config();

const { createLogger, format, transports } = require('winston');

const LOGGER = createLogger({
  level: 'info',
  format: format.combine(format.timestamp(), format.json()),
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  LOGGER.add(
    new transports.Console({
      format: format.combine(format.colorize(), format.simple()),
    }),
  );
}

module.exports = LOGGER;
