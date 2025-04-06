const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage
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

    const newEntry = {
      school: req.body.school,
      date: req.body.date,
      activity: req.body.activity,
      comments: req.body.comments,
      photos: photoUrls,
    };

    // Save to DB (if schema exists), or send response
    res.status(200).json({
      message: "Upload successful",
      data: newEntry,
    });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed", error: err });
  }
});

module.exports = router;
