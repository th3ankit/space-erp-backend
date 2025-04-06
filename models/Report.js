const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  school: String,
  date: String,
  activity: String,
  comments: String,
  photos: [String], // must be an array of strings (Cloudinary URLs)
});

module.exports = mongoose.model('Report', reportSchema);
