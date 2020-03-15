const userSchema = `
  type User {
    id: ID!
    email: String!
    nickName: String
    firstName: String
    lastName: String
    age: Int
  }

  type AuthError {
    email: String
    password: String
  }

  type AuthResponse {
    user: User
    token: String
    errors: AuthError
  }

  type ActivateAccountError {
    invalidToken: Boolean
    expired: Boolean
  }

  type ActivateAccountResponse {
    user: User
    errors: ActivateAccountError
  }

  input UserInput {
    email: String!
    nickName: String
    firstName: String
    lastName: String
    age: Int
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    findUserByEmail(email: String!): User
  }

  type Mutation {
    signUp(password: String!, input: UserInput!): User
    login(email: String!, password: String!) : AuthResponse
    activateAccount(activationToken: String!, userId: String!): ActivateAccountResponse
    resendActivationToken(userId: String!): String
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): String
  }
`;

module.exports = userSchema;
