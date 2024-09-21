const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }, // Main content of the blog post
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the post
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }], // Array of category references
  tags: [{ type: String }], // Tags to categorize the post
  coverImage: { type: String }, // URL to the cover image
  published: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
