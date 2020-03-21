const authSchema = `
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

type Mutation {
  signUp(password: String!, input: DeveloperInput!): Developer
  login(email: String!, password: String!) : AuthResponse
  activateAccount(activationToken: String!, developerId: String!): ActivateAccountResponse
  resendActivationToken(developerId: String!): String
}
`;

module.exports = authSchema;
