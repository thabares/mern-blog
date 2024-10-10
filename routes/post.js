const express = require('express');
const Post = require('../models/Post');
const User = require('../models/User'); // Assuming User model is in the models folder
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/create-post', auth, async (req, res) => {
  const { content } = req.body;
  try {
    // Create the post with the user's ID
    let createdPost = await Post.create({
      content: content,
      author: req.user.id, // This is the user ID coming from the auth middleware
    });

    // Populate the post with the user's name (or other details)
    createdPost = await createdPost.populate('author', 'username');

    res.send({ message: 'Successfully created post', post: createdPost });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: 'Server error', Error: err });
  }
});

router.get('/', async (req, res) => {
  try {
    let postsList = await Post.find().populate('author', 'username');
    res.status(200).json({ message: 'Fetching success', posts: postsList });
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
});

module.exports = router;
