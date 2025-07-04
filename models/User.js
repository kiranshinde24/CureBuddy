// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  otp: { type: String },
  isVerified: { type: Boolean, default: false }, // ⭐️ add this
  role: { type: String, enum: ['patient', 'doctor', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
