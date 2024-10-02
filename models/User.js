const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  profileImage: { type: String }, // URL to the user's profile image
  bio: { type: String }, // Short bio for the user
  socialLinks: {
    // Optional links to social media profiles
    twitter: { type: String },
    github: { type: String },
    facebook: { type: String },
  },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
