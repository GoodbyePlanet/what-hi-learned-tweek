const activationTokenSchema = `
  type ActivationToken {
    id: ID!
    developer: Developer
    token: String
    redeemed: Boolean
    invalidated: Boolean
    alreadyUsed: Boolean
  }

  type Query {
    getActivationToken(developerId: String!): ActivationToken
  }
`;

module.exports = activationTokenSchema;
