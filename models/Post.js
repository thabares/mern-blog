const mongoose = require('mongoose');

// Define the comment schema
const commentSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Comment content
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // User who made the comment
  createdAt: { type: Date, default: Date.now }, // When the comment was made
});

// Define the post schema
const postSchema = new mongoose.Schema({
  content: { type: String, required: true }, // Main content of the blog post
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who created the post
  published: { type: Boolean, default: false }, // Post is published or not
  createdAt: { type: Date, default: Date.now }, // When the post was created
  updatedAt: { type: Date, default: Date.now }, // When the post was last updated

  // New fields for comments and likes
  comments: [commentSchema], // Array of comments
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the post
  bookmarks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

// Create the Post model
const Post = mongoose.model('Post', postSchema);
module.exports = Post;
