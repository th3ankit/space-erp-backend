const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadPhotos } = require('../controllers/uploadController');

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route
router.post('/upload', upload.array('photos', 3), uploadPhotos);

module.exports = router;
