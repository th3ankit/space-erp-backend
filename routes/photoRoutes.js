const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const Report = require("../models/Report");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "space-erp-photos",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

router.post("/upload", upload.array("photos", 3), async (req, res) => {
  try {
    const photoUrls = req.files.map((file) => file.path);

    const newReport = new Report({
      school: req.body.school,
      date: req.body.date,
      activity: req.body.activity,
      comments: req.body.comments,
      photos: photoUrls,
    });

    const savedReport = await newReport.save();

    res.status(201).json({
      message: "✅ Report saved successfully",
      data: savedReport,
    });
  } catch (err) {
    console.error("❌ Error uploading report:", err);
    res.status(500).json({ message: "Upload failed", error: err });
  }
});

module.exports = router;
