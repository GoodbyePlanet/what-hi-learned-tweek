const { createError } = require('apollo-errors');

const AuthenticationError = createError('AuthenticationError', {
  message: 'Not Authenticated',
});

const PermissionError = message =>
  createError('PermissionError', {
    message,
  });

module.exports = { AuthenticationError, PermissionError };
