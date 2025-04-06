const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  school: { type: String, required: true },
  date: { type: String, required: true },
  activity: { type: String, required: true },
  comments: { type: String },
  photos: [String],
}, {
  timestamps: true
});

module.exports = mongoose.model("Report", reportSchema);
