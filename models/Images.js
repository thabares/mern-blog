const mongoose = require('mongoose');

const imagesSchema = new mongoose.Schema({
  imageUrl: { type: String },
  publicId: { type: String, require: true },
});

const Images = mongoose.model('Images', imagesSchema);
module.exports = Images;
