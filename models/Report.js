const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  educatorName: String,
  schoolName: String,
  sessionDate: Date,
  topic: String,
  activities: [String],
  photos: [String], // Cloudinary URLs
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Report', reportSchema);
