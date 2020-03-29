const { getPosts, createPost, updatePost } = require('../db-actions/posts');

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
  },
};

module.exports = postResolvers;
