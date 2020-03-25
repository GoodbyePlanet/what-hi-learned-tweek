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

  type PostInput {
    author: Developer!
    title: String!
    body: String!
    tags: [String!]
  }

  type Query {
    getPosts: [Post]
    getPostsByAuthor(authorId: ID!): [Post] @isAuthenticated
    getPostByAuthor(authorId: ID!): Post @isAuthenticated
  }

  type Mutation {
    createPost(input: PostInput!): Post @isAuthenticated
  }

`;
