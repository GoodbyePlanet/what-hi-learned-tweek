const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostsByAuthor,
} = require('../db-actions/posts');

const postResolvers = {
  Query: {
    getPosts: () => getPosts(),
    getPostById: (_, { id }) => getPostById(id),
    getPostsByAuthor: (_, { authorId }) => getPostsByAuthor(authorId),
  },
  Mutation: {
    createPost: (_, { input: postData }) => createPost(postData),
    updatePost: (
      _,
      { id, input: updatedPostData },
      { req: { developerId: loggedInDeveloper } },
    ) => updatePost(id, updatedPostData, loggedInDeveloper),
    deletePost: (_, { id }, { req: { developerId: loggedInDeveloper } }) =>
      deletePost(id, loggedInDeveloper),
  },
};

module.exports = postResolvers;
