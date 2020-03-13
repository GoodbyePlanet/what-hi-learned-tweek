const activationTokenSchema = `
  type ActivationToken {
    id: ID!
    user: User
    token: String
    reedemed: Boolean
    invalidated: Boolean
    alreadyUsed: Boolean
  }

  type Query {
    getActivationToken(userId: String!): ActivationToken
  }
`;

module.exports = activationTokenSchema;
