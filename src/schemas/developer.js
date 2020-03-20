const developerSchema = `
  directive @isAuthenticated on FIELD | FIELD_DEFINITION | INPUT_FIELD_DEFINITION

  type Developer {
    id: ID!
    email: String!
    nickName: String
  }

  type AuthError {
    email: String
    password: String
  }

  type AuthResponse {
    developer: Developer
    token: String
    errors: AuthError
  }

  type ActivateAccountError {
    invalidToken: Boolean
    expired: Boolean
  }

  type ActivateAccountResponse {
    developer: Developer
    errors: ActivateAccountError
  }

  input DeveloperInput {
    email: String!
    nickName: String
  }

  type Query {
    getDevelopers: [Developer] @isAuthenticated
    getDeveloperById(id: ID!): Developer
    findDeveloperByEmail(email: String!): Developer
  }

  type Mutation {
    signUp(password: String!, input: DeveloperInput!): Developer
    login(email: String!, password: String!) : AuthResponse
    activateAccount(activationToken: String!, developerId: String!): ActivateAccountResponse
    resendActivationToken(developerId: String!): String
    updateDeveloper(id: ID!, input: DeveloperInput!): Developer
    deleteDeveloper(id: ID!): String
  }
`;

module.exports = developerSchema;
