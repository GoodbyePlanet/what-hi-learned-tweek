const Post = require('../models/Post');
const { Developer } = require('../models/Developer');
const { PermissionError } = require('../validation/AuthErrors');
const LOGGER = require('../logger/logger');

const getPosts = async () => Post.find({});

const createPost = async postData => {
  try {
    const developer = await Developer.findById(postData.author);

    return await new Post({ ...postData, author: developer }).save();
  } catch (error) {
    LOGGER.error('Error while creating post', error);
  }
};

const updatePost = async (id, updatedPost, loggedInDeveloper) => {
  try {
    const post = await Post.findById(id);

    if (post.author._id.toString() !== loggedInDeveloper) {
      const Error = PermissionError('Not permitted to update resource!');
      throw new Error();
    }

    return await Post.findByIdAndUpdate(
      id,
      { ...updatedPost, author: post.author },
      {
        new: true,
        useFindAndModify: false,
      },
    );
  } catch (error) {
    LOGGER.error('Error while updating post ', error);
  }
};

const deletePost = async (id, loggedInDeveloper) => {
  try {
    const post = await Post.findById(id);

    if (post.author._id.toString() !== loggedInDeveloper) {
      const Error = PermissionError('Not permitted to delete resource!');
      throw new Error();
    }

    return (await Post.findByIdAndRemove(id, {
      useFindAndModify: false,
    }))
      ? id
      : new Error(`Delete failed, ${id} not found!`);
  } catch (error) {
    LOGGER.error('Error while deleting post', error);
  }
};

const getPostById = async id =>
  Post.findById(id).orFail(new Error(`Post with ${id} not found!`));

const getPostsByAuthor = async authorId => {
  return Post.find({ 'author._id': authorId }).orFail(
    `No post for author with id ${authorId}`,
  );
};

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getPostById,
  getPostsByAuthor,
};
