// controllers/uploadController.js
const cloudinary = require('cloudinary').v2;
const Report = require('../models/Report');

const uploadReport = async (req, res) => {
  try {
    const { school, date, activity, comments } = req.body;
    const files = req.files;
console.log("Received fields:", req.body);
console.log("Received files:", req.files);

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const uploadedPhotos = await Promise.all(
      files.map(file => cloudinary.uploader.upload(file.path))
    );

    const photoUrls = uploadedPhotos.map(photo => photo.secure_url);

    const newReport = new Report({
      school,
      date,
      activity,
      comments,
      photos: photoUrls
    });

    await newReport.save();

    res.status(200).json({ message: "Report saved", report: newReport });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { uploadReport };
