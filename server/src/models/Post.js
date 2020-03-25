const mongoose = require('mongoose');
const { developerSchema } = require('./Developer');

const { Schema } = mongoose;

const postSchema = new Schema(
  {
    author: {
      type: developerSchema,
      required: true,
    },
    title: { type: String, required: true },
    body: { type: String, required: true },
    tags: [{ type: String }],
  },
  {
    timestamps: true,
  },
);

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
