// controllers/uploadController.js
const Report = require('../models/Report');

const uploadReport = async (req, res) => {
  try {
    const { schoolName, date, activity, comments } = req.body;
    const photos = req.files.map(file => file.path);

    // Validate
    if (!schoolName || !date || !activity || photos.length === 0) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save report to MongoDB
    const report = new Report({
      schoolName,
      date,
      activity,
      comments,
      photos,
    });

    await report.save();

    // Send full report in response
    res.status(200).json({
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { uploadReport };
