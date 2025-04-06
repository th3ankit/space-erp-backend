const express = require("express");
const router = express.Router();
const multer = require("multer");
const cloudinary = require("../utils/cloudinaryConfig");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/upload", upload.array("photos", 3), async (req, res) => {
  try {
    const uploadedUrls = [];

    for (const file of req.files) {
      const result = await cloudinary.uploader.upload_stream(
        { folder: "space-erp" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary upload error:", error);
            return res.status(500).json({ error: "Upload failed" });
          }
          uploadedUrls.push(result.secure_url);

          if (uploadedUrls.length === req.files.length) {
            return res.json({ urls: uploadedUrls });
          }
        }
      );

      result.end(file.buffer);
    }
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
