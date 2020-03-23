const developerSchema = `
  directive @isAuthenticated on FIELD | FIELD_DEFINITION

  type Developer {
    id: ID!
    email: String!
    nickName: String
  }

  input DeveloperInput {
    email: String!
    nickName: String
  }

  type Query {
    getDevelopers: [Developer] @isAuthenticated
    getDeveloperById(id: ID!): Developer @isAuthenticated
    findDeveloperByEmail(email: String!): Developer @isAuthenticated
  }

  type Mutation {
    updateDeveloper(id: ID!, input: DeveloperInput!): Developer @isAuthenticated
    deleteDeveloper(id: ID!): String @isAuthenticated
  }
`;

module.exports = developerSchema;
