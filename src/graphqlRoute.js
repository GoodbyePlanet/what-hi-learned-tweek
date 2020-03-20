require('dotenv').config();

const { ApolloServer } = require('apollo-server-express');
const {
  fileLoader,
  mergeTypes,
  mergeResolvers,
} = require('merge-graphql-schemas');
const path = require('path');

const {
  auth: { accessToken },
} = require('../config').get(process.env.NODE_ENV);
const { createAuthDirectives } = require('gql-auth-directives');
const { AuthenticationError } = require('./validation/AuthErrors');
const { verifyAccessToken } = require('./accessControl/accessControl');

// fileLoader is function for importing all files from specified folder
// path.join(__dirname, './schemas')
///Users/nemanjavasic/Documents/NODEJS/mongodb-nodejs-graphql-starter-kit/src/schemas

const authDirectives = createAuthDirectives({
  isAuthenticatedHandler: ({ req }) => {
    const authorization = req.headers['authorization'];

    if (!authorization) {
      throw new AuthenticationError();
    }

    try {
      const token = authorization.split(' ')[1];
      const payload = verifyAccessToken(token, accessToken.secret);
      req.developerId = payload.id;
    } catch (error) {
      throw new AuthenticationError();
    }
  },
});

const typeDefs = mergeTypes(fileLoader(path.join(__dirname, './schemas')));
const resolvers = mergeResolvers(
  fileLoader(path.join(__dirname, './resolvers')),
);

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  schemaDirectives: {
    ...authDirectives,
  },
  context: ({ req, res }) => ({ req, res }),
});

module.exports = apolloServer;
