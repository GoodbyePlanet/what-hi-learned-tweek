const postSchema = `
  directive @isAuthenticated on FIELD | FIELD_DEFINITION

  type Post {
    id: ID!
    author: Developer!
    title: String!
    body: String!
    tags: [String!]
    createdAt: String
  }

  input PostInput {
    author: ID!
    title: String!
    body: String!
    tags: [String!]
  }

  type Query {
    getPosts: [Post]
    getPostById(id: ID!): Post @isAuthenticated
    getPostsByAuthor(authorId: ID!): [Post] @isAuthenticated
  }

  type Mutation {
    createPost(input: PostInput!): Post @isAuthenticated
    updatePost(id: ID!, input: PostInput!): Post @isAuthenticated
    deletePost(id: ID!): String @isAuthenticated
  }
`;

module.exports = postSchema;
