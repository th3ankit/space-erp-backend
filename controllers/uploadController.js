// controllers/uploadController.js
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Report = require("../models/Report"); // Assuming this is your Mongoose model

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "space-erp-reports",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

// Controller function
const uploadReport = async (req, res) => {
  try {
    const { schoolName, date, activity, comments } = req.body;
    const photos = req.files.map(file => file.path);

    if (!schoolName || !date || !activity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const report = new Report({
      schoolName,
      date,
      activity,
      comments,
      photos,
    });

    await report.save();

    res.status(200).json({
      message: "Report submitted successfully",
      report,
    });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  upload,
  uploadReport,
};
