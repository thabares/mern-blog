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

router.get('/', auth, async (req, res) => {
  try {
    let postsList = await Post.find({
      $or: [{ published: false, author: req.user.id }, { published: true }],
    }).populate('author', 'username');

    const updatedBookMark = postsList.map((post) => {
      const { content, author, createdAt, published } = post;
      return {
        content,
        author,
        published,
        createdAt,
        _id: post._id,
        isBookmarked: post.bookmarks.includes(req.user.id), // Check if current user has bookmarked
      };
    });

    res
      .status(200)
      .json({ message: 'Fetching success', posts: updatedBookMark });
  } catch (err) {
    res.status(500).send('Error fetching posts');
  }
});

router.post('/:postId/bookmark', auth, async (req, res) => {
  const { postId } = req.params;
  const userId = req.user.id; // Assuming the user is stored in req.user after authentication

  try {
    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check if user already bookmarked the post
    const isBookmarked = post.bookmarks.includes(userId);

    if (isBookmarked) {
      // Remove bookmark
      post.bookmarks = post.bookmarks.filter(
        (id) => id.toString() !== userId.toString()
      );
    } else {
      // Add bookmark
      post.bookmarks.push(userId);
    }

    await post.save();
    res.status(200).json({
      message: 'Bookmark toggled successfully',
      isBookmarked: !isBookmarked,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:postId', auth, async (req, res) => {
  const { postId } = req.params;
  try {
    const postDetails = await Post.findById(postId);

    console.log('postDetails', postDetails);
    console.log('postDetails', req.user.id);

    if (postDetails.author?.toString() !== req.user.id?.toString()) {
      return res.status(500).json({ message: 'This post is not yours' });
    }

    await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      message: 'successfully deleted your post',
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete' });
  }
});

module.exports = router;
