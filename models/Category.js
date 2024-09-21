const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String }, // Optional description for the category
  createdAt: { type: Date, default: Date.now },
});

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
