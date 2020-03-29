const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
} = require('../db-actions/posts');

const postResolvers = {
  Query: {
    getPosts: () => getPosts(),
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
