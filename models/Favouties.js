const mongoose = require('mongoose');

const favouritesSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
  createdAt: { type: Date, default: Date.now },
});

const Favourites = mongoose.model('Favourites', favouritesSchema);
module.exports = Favourites;
