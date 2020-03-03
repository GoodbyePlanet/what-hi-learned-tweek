const userSchema = `
  type User {
    id: ID!,
    email: String!,
    nickName: String,
    firstName: String
    lastName: String
    age: Int
  }

  type Query {
    getUsers: [User]
    getUserById(id: ID!): User
  }
`;

module.exports = userSchema;
