const { ApolloServer, gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    nickName: String!
    firstName: String!
    lastName: String!
    age: Int
  }

  type Query {
    getUsers: [User]
  }
`;

const resolvers = {
  Query: {
    getUsers: () => [
      {
        nickName: 'Nemanjas',
        firstName: 'Nemanja',
        lastName: 'Vasic',
        age: 27,
      },
    ],
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

module.exports = apolloServer;
