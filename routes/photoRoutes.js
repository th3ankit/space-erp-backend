// routes/photoRoutes.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer & storage config
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'space-erp-photos',
    allowed_formats: ['jpg', 'png'],
  },
});

const upload = multer({ storage });

// POST /api/photos/upload
router.post('/upload', upload.single('photo'), (req, res) => {
  if (!req.file || !req.file.path) {
    return res.status(400).json({ error: 'Upload failed' });
  }
  res.json({ imageUrl: req.file.path });
});

module.exports = router;
