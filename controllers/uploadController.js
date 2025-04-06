// controllers/uploadController.js

const cloudinary = require('cloudinary').v2;
const Report = require('../models/Report'); // adjust path if needed

// Cloudinary config (if not done globally)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadReport = async (req, res) => {
  try {
    const { schoolName, date, activity, comments } = req.body;

    if (!schoolName || !date || !activity) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Upload all received files to Cloudinary
    const photoUrls = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'space-erp-photos',
        });
        photoUrls.push(result.secure_url);
      }
    }

    // Save to MongoDB
    const newReport = new Report({
      schoolName,
      date,
      activity,
      comments,
      photos: photoUrls,
    });

    await newReport.save();

    res.status(200).json({
      message: "Report submitted successfully",
      report: newReport,
    });

  } catch (err) {
    console.error("Upload Error:", err);
    res.status(500).json({ message: "Server error while uploading report." });
  }
};

module.exports = { uploadReport };
