const userSchema = `
  type User {
    id: ID!,
    email: String!,
    nickName: String,
    firstName: String
    lastName: String
    age: Int
  }

  input UserInput {
    email: String!,
    nickName: String,
    firstName: String,
    lastName: String,
    age: Int
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
    findUserByEmail(email: String!): User
  }

  type Mutation {
    createUser(input: UserInput!): User
    updateUser(id: ID!, input: UserInput!): User
    deleteUser(id: ID!): String
  }
`;

module.exports = userSchema;
