const mongoose = require('mongoose');
const refreshTokenSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user for whom the token was issued
  token: { type: String, required: true }, // The actual refresh token
  expiryDate: { type: Date, required: true }, // Token expiration date
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);
module.exports = RefreshToken;
