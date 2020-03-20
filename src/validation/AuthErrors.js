const { createError } = require('apollo-errors');

const AuthenticationError = createError('AuthenticationError', {
  message: 'Not Authenticated',
});

module.exports = { AuthenticationError };
