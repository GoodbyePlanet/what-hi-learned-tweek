const developerSchema = `
  directive @isAuthenticated on FIELD | FIELD_DEFINITION | INPUT_FIELD_DEFINITION

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
    getDeveloperById(id: ID!): Developer
    findDeveloperByEmail(email: String!): Developer
  }

  type Mutation {
    updateDeveloper(id: ID!, input: DeveloperInput!): Developer
    deleteDeveloper(id: ID!): String
  }
`;

module.exports = developerSchema;
